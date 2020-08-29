const weekOfYear = require('./functions/weekOfYear.js');
const $ = require('cheerio');
const rp = require('request-promise');
const request = require('request');

rp(`https://www.avamet.org/mx-mes.php?id=c24m124e03`)
    .then(html => {
        const element = $('input[name ="vdia"]', html)[0];
        const values = element.attribs.value.split('%');
        values.forEach((dailyRecord, index) => {
            if (index + 1 !== values.length) {
                return;
            }
            const values = dailyRecord.split('|');
            const [date, t_min, t_avg, t_max] = values;
            request.post({
                url: 'http://localhost:9200/daily_temperature/_doc', body: {
                    station_id: stationId,
                    date,
                    t_min: parseFloat(t_min.replace(',', '.')),
                    t_max: parseFloat(t_max.replace(',', '.')),
                    t_avg: parseFloat(t_avg.replace(',', '.')),
                    week_number: weekOfYear(date),
                    month: parseInt(date.split('-')[1])
                },
                json: true
            })
        });

    })
    .catch(err => {
        console.error(err);
    });
