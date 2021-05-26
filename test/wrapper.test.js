const {
	calc,
	ERROR,
} = require('../wrapper');

test('Percent growth by period', () => {
  expect(percentGrowthByPeriod(8, 1, 3)).toBe(-50);
});

