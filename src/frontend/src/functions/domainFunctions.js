import constants from '@/constants';

const colorMapRange = constants.dailyColorAnomalyThresholds;
const colorPalette = constants.dailyAnomalyColorPalette;
const dates = constants.dates;


export const getWeekNumber = (d) => {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return  weekNo;
}
export const calculateCurrentYearAnomalies = (dailyTemperature, weekOfYearAvg,  year) => {
    
    const firstDayOfYear = new Date (`01-01-${year}`);
    let currentDayProcessed = firstDayOfYear;
    let today = new Date();
    //FEXME
    if (year !== currentYear) {
        today == new Date (`12-31-${year}`);
    }
    let dayCounter = 0;
    while (currentDayProcessed < today) {
        const date = new Date(currentDayProcessed);
        const anomaly = calculateDayAnomaly(dailyTemperature, weekOfYearAvg, currentDayProcessed, dayCounter);
        dayCounter++;
        const dateColor = getDayColorFromAnomaly(anomaly);
        const dateCategory = dates.find(category => category.key === dateColor);
        dateCategory && dateCategory.dates.push(date);       
        currentDayProcessed.setDate(currentDayProcessed.getDate() + 1);
    }
    return dates;
};
export const getDayColorFromAnomaly = (anomaly) => {
    if (anomaly < colorMapRange[0]) {
        return colorPalette[0];
    } else if (anomaly >= colorMapRange[0] && anomaly < colorMapRange[1]) {
        return colorPalette[1];
    } else if (anomaly >= colorMapRange[1] && anomaly < colorMapRange[2]) {
        return colorPalette[2];
    } else if (anomaly >= colorMapRange[2] && anomaly < colorMapRange[3]) {
        return colorPalette[3];
    } else if (anomaly >= colorMapRange[3] && anomaly < colorMapRange[4]) {
        return colorPalette[4];
    } else if (anomaly >= colorMapRange[4] && anomaly <= colorMapRange[5]) {
        return colorPalette[5];
    } else {
        return colorPalette[6];
    }
};
export const calculateDayAnomaly = (dailyTemperature, weekOfYearAvg, date, dayOfYear) => {
    try {
        const weekOfTheYear = getWeekNumber(date);
        const weekOfTheYearAvgTemperature = weekOfYearAvg.aggregations['2'].buckets.find(obj => obj.key === weekOfTheYear)['1'].value;
        const anomaly = dailyTemperature.hits.hits[dayOfYear]._source.t_avg - weekOfTheYearAvgTemperature;
        return anomaly;
    } catch (e) {
        return null;
    }
};
