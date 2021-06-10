/* =============================================================================
  Wrapper for the Four Change Calculations

  This wrapper does the following to handle the algebra of mathematical change:
    1. Determines if exactly three of the variables are defined.
    2. Determines if all defined variables are numbers.
    3. If conditions (1) and (2) aren't met, then throws a meaningful error.
    4. If conditions (1) and (2) are met, then it routes logic
    to the correct function to derive the single undefined variable.

  This wrapper is a conveniece layer that allows for a single function to be
  called with indeterminate variables (as long as three of the four
  are defined). Helpful if the use case is passing in the four variables
  from a GUI.
============================================================================= */
const {
  percentChangeByPeriod,
  start,
  end,
  periods
} = require('./index.js');

const ERRS = {
  IsUndefinedOrANumber: 'Each value must be undefined or a number',
  ExactlyOneUndefined: 'Exactly one of the four values must be undefined'
};

/**
 * Calculates various change values over time
 * @param  {Number} Start Amount
 * @param  {Number} End Amount
 * @param  {Number} Number of periods
 * @param  {Number} Percent change
 * @return {Number|Error}
 */
function calc (startNumber, endNumber, period, percentChange) {
  const values = { startNumber, endNumber, period, percentChange };
  const undefinedVal = chkValues(values);
  let val;

  switch (undefinedVal) {
    case 'startNumber':
      val = start(endNumber, period, percentChange);
      break;
    case 'endNumber':
      val = end(startNumber, period, percentChange);
      break;
    case 'period':
      val = periods(startNumber, endNumber, percentChange);
      break;
    case 'percentChange':
      val = percentChangeByPeriod(startNumber, endNumber, period);
      break;
  }

  console.log(`Calculated ${undefinedVal} as ${val} on these:`, values);
  return val;
}

/**
 * Checks the four values to ensure exactly one is undefined, and the
 * rest are numeric.
 * @param  {Object} Values: {startNumber, endNumber, periods, percentChange}
 * @return {String|Error} If no errs, returns the string of variable name
 */
function chkValues (obj) {
  const undefinedVals = [];

  for (const prop in obj) {
    const val = obj[prop];
    if (undefined === val) {
      undefinedVals.push(prop);
    } else if (isNaN(val)) {
      throw new Error(ERRS.IsUndefinedOrANumber);
    }
  }

  if (undefinedVals.length === 1) {
    // Return the name of the only undefined value
    return undefinedVals[0];
  } else {
    throw new Error(ERRS.ExactlyOneUndefined);
  }
}

module.exports = {
  calc,
  ERRS
};
