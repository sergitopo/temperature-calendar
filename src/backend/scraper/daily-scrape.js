require('dotenv').config();
const cheerio = require('cheerio');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { Client } = require('@elastic/elasticsearch');
const weekOfYear = require('./functions/weekOfYear.js');

const STATIONS = [
  { id: 'c24m124e03', name: 'Fontanars' },
];

const THROTTLE_DELAY = 2000;
const SNAPSHOT_REPOSITORY = 'elastic-daily-temperatures-snapshots';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const esClient = new Client({
  node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function getCurrentYearRangeQuery() {
  const currentYear = new Date().getFullYear();
  return {
    bool: {
      must: [
        {
          range: {
            date: {
              gte: `01-01-${currentYear}`,
              lte: `31-12-${currentYear}`
            }
          }
        }
      ]
    }
  };
}

async function scrapeStation(stationId) {
  try {
    const response = await fetch(`https://www.avamet.org/mx-mes.php?id=${stationId}`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const element = $('input[name ="vdia"]')[0];

    if (!element || !element.attribs || !element.attribs.value) {
      console.warn(`Could not find data for station ${stationId}`);
      return null;
    }

    const values = element.attribs.value.split('%');
    const dailyRecord = values[values.length - 1];

    if (!dailyRecord) return null;

    const daily_record = dailyRecord.split('|');
    const [date, t_min, t_avg, t_max] = daily_record;

    return {
      station_id: stationId,
      date,
      t_min: parseFloat(t_min.replace(',', '.')),
      t_max: parseFloat(t_max.replace(',', '.')),
      t_avg: parseFloat(t_avg.replace(',', '.')),
      week_number: weekOfYear(date),
      month: parseInt(date.split('-')[1])
    };
  } catch (err) {
    console.error(`Error scraping station ${stationId}:`, err);
    return null;
  }
}

async function indexToElasticsearch(data) {
  try {
    const response = await fetch('http://localhost:9200/daily_temperature/_doc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Failed to index: ${response.statusText}`);
    }

    console.log(`✓ Indexed data for ${data.date} to Elasticsearch`);
  } catch (err) {
    console.error(`Error indexing to Elasticsearch:`, err);
    throw err;
  }
}

async function queryDailyTemperatures() {
  try {
    const response = await fetch('http://localhost:9200/daily_temperature/_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        size: 500,
        sort: [{ date: { order: 'asc' } }],
        query: getCurrentYearRangeQuery()
      })
    });

    if (!response.ok) {
      throw new Error(`Query failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error querying daily temperatures:', err);
    throw err;
  }
}

async function queryMonthlyAggregates() {
  try {
    const response = await fetch('http://localhost:9200/daily_temperature/_search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        aggs: {
          by_month: {
            histogram: {
              field: 'month',
              interval: 1,
              min_doc_count: 1
            },
            aggs: {
              avg_temp: { avg: { field: 't_avg' } },
              min_temp: { min: { field: 't_min' } },
              max_temp: { max: { field: 't_max' } }
            }
          }
        },
        size: 0,
        query: getCurrentYearRangeQuery()
      })
    });

    if (!response.ok) {
      throw new Error(`Query failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error querying monthly aggregates:', err);
    throw err;
  }
}

async function ensureSnapshotRepository(repositoryName, snapshotBucket) {
  try {
    console.log(`Checking if snapshot repository exists: ${repositoryName}...`);
    
    const checkResponse = await fetch(`http://localhost:9200/_snapshot/${repositoryName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (checkResponse.ok) {
      console.log(`✓ Snapshot repository already exists: ${repositoryName}`);
      return;
    }

    console.log(`Creating snapshot repository: ${repositoryName}...`);
    
    const createResponse = await fetch(`http://localhost:9200/_snapshot/${repositoryName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 's3',
        settings: {
          bucket: snapshotBucket,
          region: process.env.AWS_REGION || 'eu-west-1',
          base_path: 'es-snapshots',
          compress: true
        }
      })
    });

    if (!createResponse.ok) {
      throw new Error(`Failed to create repository: ${createResponse.statusText}`);
    }

    console.log(`✓ Snapshot repository created: ${repositoryName}`);
  } catch (err) {
    console.error('Error ensuring snapshot repository:', err);
    throw err;
  }
}

async function createSnapshot(repositoryName, snapshotName) {
  try {
    const response = await fetch(`http://localhost:9200/_snapshot/${repositoryName}/${snapshotName}?wait_for_completion=true`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ indices: 'daily_temperature' })
    });

    if (!response.ok) {
      throw new Error(`Snapshot creation failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✓ Snapshot created: ${snapshotName}`);
    return data;
  } catch (err) {
    console.error('Error creating snapshot:', err);
    throw err;
  }
}

async function uploadToS3(bucket, key, data) {
  try {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(data, null, 2),
      ContentType: 'application/json',
    });

    await s3Client.send(command);
    console.log(`✓ Uploaded to S3: s3://${bucket}/${key}`);
  } catch (err) {
    console.error(`Error uploading to S3 (${key}):`, err);
    throw err;
  }
}

async function run() {
  try {
    const staticFilesBucket = process.env.S3_STATIC_FILES_BUCKET;
    const snapshotBucket = process.env.S3_SNAPSHOT_BUCKET;

    if (!staticFilesBucket) {
      throw new Error('S3_STATIC_FILES_BUCKET environment variable is required');
    }

    if (!snapshotBucket) {
      throw new Error('S3_SNAPSHOT_BUCKET environment variable is required');
    }

    console.log('--- Starting daily scrape and backup ---');

    for (const station of STATIONS) {
      console.log(`\nScraping station: ${station.name} (${station.id})...`);

      const scrapedData = await scrapeStation(station.id);
      if (scrapedData) {
        await indexToElasticsearch(scrapedData);
      }

      await sleep(THROTTLE_DELAY);
    }

    console.log('\n--- Querying Elasticsearch ---');
    const dailyTemperatures = await queryDailyTemperatures();
    const monthlyAggregates = await queryMonthlyAggregates();

    console.log('\n--- Ensuring Elasticsearch Snapshot Repository ---');
    /*await ensureSnapshotRepository(SNAPSHOT_REPOSITORY, snapshotBucket);

    console.log('\n--- Creating Elasticsearch Snapshot ---');
    const today = new Date().toISOString().split('T')[0];
    const snapshotName = `snapshot-${today}`;
    await createSnapshot(SNAPSHOT_REPOSITORY, snapshotName);

    console.log('\n--- Uploading static files to S3 ---');*/
    await uploadToS3(staticFilesBucket, 'daily-temperatures.json', dailyTemperatures);
    await uploadToS3(staticFilesBucket, 'monthly-temperatures.json', monthlyAggregates);

    console.log('\n✓ Daily scrape and backup completed successfully');
  } catch (error) {
    console.error('Error during daily scrape:', error);
    process.exit(1);
  }
}

run();
