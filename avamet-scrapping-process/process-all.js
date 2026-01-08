const initDate = '2014-10-23';
const toDate = '2026-01-07';
const cheerio = require('cheerio');
const weekOfYear = require('./functions/weekOfYear.js');
const dateRange = require('./functions/dateRangeToDates.js');

const months = dateRange(initDate, toDate);
const stationId = 'c24m124e03';

async function processAll() {
    for (const month of months) {
        try {
            const response = await fetch(`https://www.avamet.org/mx-mes.php?id=${stationId}&data=${month}`);
            const html = await response.text();
            const $ = cheerio.load(html);
            const element = $('input[name ="vdia"]')[0];

            if (!element || !element.attribs || !element.attribs.value) {
                console.warn(`Could not find data for month ${month}`);
                continue;
            }

            const values = element.attribs.value.split('%');
            for (const dailyRecord of values) {
                if (!dailyRecord) continue;
                
                const recordValues = dailyRecord.split('|');
                const [date, t_min, t_avg, t_max] = recordValues;
                
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
                    console.error(`Failed to post data for ${date}: ${postResponse.statusText}`);
                }
            }
        } catch (err) {
            console.error(`Error processing month ${month}:`, err);
        }
    }
}

processAll();
