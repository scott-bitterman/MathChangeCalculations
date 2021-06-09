const {
	calc,
	ERRS,
} = require('../wrapper');

/* ============================================================================= 
Happy Paths :)
============================================================================= */ 
test('Start number', () => {
  expect(calc(undefined, 8, 3, 100)).toBe(1);
});

test('End number', () => {
  expect(calc(1, undefined, 3, 100)).toBe(8);
});

test('Periods', () => {
  expect(calc(1, 8, undefined, 100)).toBe(3);
});

test('Percent growth by period', () => {
  expect(calc(1, 8, 3, undefined)).toBe(100);
});

test('Passing a 0 start number', () => {
  expect(calc(0, 8, 3, undefined)).toBe(Infinity);
});

/* ============================================================================= 
Unhappy Paths :( 
============================================================================= */ 
test('Passing more than one undefined throws an err', () => {
  expect(() => calc(1, 8, 3, 100)).toThrow(ERRS.ExactlyOneUndefined);
});

test('Passing all numbers throws an err', () => {
  expect(() => calc(1, 8, undefined, undefined)).toThrow(ERRS.ExactlyOneUndefined);
});

test('Passing something that is not undefined or a number throws an err', () => {
  expect(() => calc(1, 8, undefined, 'I am a string')).toThrow(ERRS.IsUndefinedOrANumber);
});