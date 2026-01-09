const weekOfYear = require('./functions/weekOfYear.js');
const cheerio = require('cheerio');

const stationId = 'c24m124e03';

async function processYesterday() {
    try {
        const response = await fetch(`https://www.avamet.org/mx-mes.php?id=${stationId}`);
        const html = await response.text();
        const $ = cheerio.load(html);
        const element = $('input[name ="vdia"]')[0];
        
        if (!element || !element.attribs || !element.attribs.value) {
            console.error('Could not find data in the page');
            return;
        }

        const values = element.attribs.value.split('%');
        
        // We only care about the last record (yesterday or today)
        const dailyRecord = values[values.length - 2]; // The last one is empty after the last %
        if (!dailyRecord) return;

        const daily_record = dailyRecord.split('|');
        const [date, t_min, t_avg, t_max] = daily_record;
        
        const body = {
            station_id: stationId,
            date,
            t_min: parseFloat(t_min.replace(',', '.')),
            t_max: parseFloat(t_max.replace(',', '.')),
            t_avg: parseFloat(t_avg.replace(',', '.')),
            week_number: weekOfYear(date),
            month: parseInt(date.split('-')[1])
        };

        const postResponse = await fetch('http://localhost:9200/daily_temperature/_doc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (postResponse.ok) {
            console.log(`Successfully processed data for ${date}`);
        } else {
            console.error(`Failed to post data: ${postResponse.statusText}`);
        }
    } catch (err) {
        console.error(err);
    }
}

processYesterday();
