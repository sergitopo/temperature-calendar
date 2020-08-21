const initDate = '2014-11-01';
const toDate = '2020-08-01';
const $ = require('cheerio');
const rp = require('request-promise');
const request = require('request');


function dateRange(startDate, endDate) {
    var start      = startDate.split('-');
    var end        = endDate.split('-');
    var startYear  = parseInt(start[0]);
    var endYear    = parseInt(end[0]);
    var dates      = [];
  
    for(var i = startYear; i <= endYear; i++) {
      var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1])-1 : 0;
      for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        var month = j+1;
        var displayMonth = month < 10 ? '0'+month : month;
        dates.push([i, displayMonth, '01'].join('-'));
      }
    }
    return dates;
  }

const months = dateRange(initDate, toDate);
const stationId = 'c24m124e03';
months.forEach(month => {
    rp(`https://www.avamet.org/mx-mes.php?id=c24m124e03&data=${month}`)
        .then(html => {
            const element = $('input[name ="vdia"]', html)[0];
            const values = element.attribs.value.split('%');
            values.forEach(dailyRecord => {
                const values = dailyRecord.split('|');
                const [date,t_min, t_avg, t_max] = values;
                request.post({url: 'http://localhost:9200/daily_temperature/_doc', body: {station_id: stationId, date, t_min: parseFloat(t_min.replace(',', '.')), t_max:  parseFloat(t_max.replace(',', '.')), t_avg:  parseFloat(t_avg.replace(',', '.'))}, json: true})
            });
                

        })
        .catch(err => {
            console.error(err);
        });
})
