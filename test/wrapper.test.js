const {
	calc,
	ERROR,
} = require('../wrapper');

test('Percent growth by period', () => {
  expect(percentGrowthByPeriod(TEST.start, TEST.end, TEST.periods)).toBe(TEST.growth);
});

