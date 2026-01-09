import constants from '../../src/constants';
import { getDayColorFromAnomaly } from '../../src/functions/domainFunctions';

describe('anomalies color should: \n', () => {
    test('a -10º is the coldest color in palette', () => {
        const coldestColor = constants.dailyAnomalyColorPalette[0];
        expect(getDayColorFromAnomaly(-10)).toBe(coldestColor);
    });

    test('a 10º is the warmest color in palette', () => {
        const warmest = constants.dailyAnomalyColorPalette[constants.dailyAnomalyColorPalette.length - 1];
        expect(getDayColorFromAnomaly(10)).toBe(warmest);
    });

    test('a 0º is the neutral color in palette', () => {
        const neutral = constants.dailyAnomalyColorPalette[Math.trunc(constants.dailyAnomalyColorPalette.length / 2)];
        expect(getDayColorFromAnomaly(0)).toBe(neutral);
    });
});