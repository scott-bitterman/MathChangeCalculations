const {
	percentGrowthByPeriod,
	start,
	end,
	periods
} = require('../index');

// These test numbers should match growth calcalutions across all equations
const TEST = {
	start: 1, 
	end: 8,
	periods: 3,
	growth: 100
};

test('Percent growth by period', () => {
  expect(percentGrowthByPeriod(TEST.start, TEST.end, TEST.periods)).toBe(TEST.growth);
});

test('Calculate start number based on end number, periods, and growth', () => {
  expect(start(TEST.end, TEST.periods, TEST.growth)).toBe(TEST.start);
});

test('Calculate end number based on start number, periods, and growth', () => {
  expect(end(TEST.start, TEST.periods, TEST.growth)).toBe(TEST.end);
});

test('Calculate periods based on start number, end number and  growth', () => {
  expect(periods(TEST.start, TEST.end, TEST.growth)).toBe(TEST.periods);
});

test('Start value is 0. Testing dividing by zero in JS.', () => {
  expect(percentGrowthByPeriod(0, TEST.end, TEST.periods)).toBe(Infinity);
});

test('End growth is 0 should always be equal to -100%', () => {
  expect(percentGrowthByPeriod(1, 0, 50)).toBe(-100);
});

test('Passing a string where a number is expected', () => {
  expect(percentGrowthByPeriod('IAmAString', TEST.end, TEST.periods)).toBe(NaN);
});

test('Negative growth', () => {
  expect(percentGrowthByPeriod(4, 1, 2)).toBe(-50);
});

test('Period equation with zero growth', () => {
	// If there is zero growth (change), then periods are unknown/undefined.
  expect(periods(4, 4, 0)).toBe(NaN);
});

test('Period equation with extraordianry growth', () => {
	// If there is zero growth, but a percent growth is specified,
	// then expect zero
  expect(periods(4, 4, 500)).toBe(0);
});