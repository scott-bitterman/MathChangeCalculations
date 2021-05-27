const {
	percentChangeByPeriod,
	start,
	end,
	periods
} = require('../index');

/* ============================================================================= 
These test numbers should match change calcalutions across all equations
============================================================================= */ 
const TEST = {
	start: 1, 
	end: 8,
	periods: 3,
	change: 100 // Percent change
};

/* ============================================================================= 
Happy Paths :)
============================================================================= */ 
test('Percent change by period', () => {
  expect(percentChangeByPeriod(TEST.start, TEST.end, TEST.periods)).toBe(TEST.change);
});

test('Calculate start number based on end number, periods, and change', () => {
  expect(start(TEST.end, TEST.periods, TEST.change)).toBe(TEST.start);
});

test('Calculate end number based on start number, periods, and change', () => {
  expect(end(TEST.start, TEST.periods, TEST.change)).toBe(TEST.end);
});

test('Calculate periods based on start number, end number and  change', () => {
  expect(periods(TEST.start, TEST.end, TEST.change)).toBe(TEST.periods);
});

test('Negative change', () => {
  expect(percentChangeByPeriod(4, 1, 2)).toBe(-50);
});

test('Fractional change', () => {
  expect(percentChangeByPeriod(1/3, 4/3, 2)).toBe(100);
});

test('End is 0 always be equal to -100%', () => {
  expect(percentChangeByPeriod(1, 0, 50)).toBe(-100);
});

test('Period equation with zero change', () => {
  expect(periods(4, 4, 99999999)).toBe(0);
});

test('-100% change results in an end value of 0', () => {
  expect(end(1, 1, -100)).toBe(0);
});

test('-100% change results in an end value of 0', () => {
  expect(periods(1, 0, -100)).toBe(1);
});

/* ============================================================================= 
Unhappy Paths :( 
============================================================================= */ 
test('Testing 0 periods', () => {
	// Dividing by 0 is mathematically undefined. JS returns Infinity.
  expect(percentChangeByPeriod(1, 2, 0)).toBe(Infinity);
});

test('Start is 0. Testing dividing by zero in JS', () => {
	// Dividing by 0 is mathematically undefined. JS returns Infinity.
  expect(percentChangeByPeriod(0, 1, 1)).toBe(Infinity);
});

test('Start is 0. Testing dividing by zero in JS', () => {
	// 0/0 is mathematically undefined. JS returns NaN?!
  expect(percentChangeByPeriod(0, 0, 1)).toBe(NaN);
});

test('Passing a string where a number is expected', () => {
  expect(percentChangeByPeriod('string', 'string', 'string')).toBe(NaN);
});

test('No change, zero change in deriving periods', () => {
	// If percent change is 0 and there's no actual change, then periods 
	// can't be derived due to 0/0, which JS calculates as NaN
  expect(periods(1, 1, 0)).toBe(NaN);
});

test('Period equation with extraordianry change', () => {
	// If there is zero change, but a percent change is specified, then expect zero
	// It takes 0 periods to change nothing.
  expect(periods(4, 4, 500)).toBe(0);
});

