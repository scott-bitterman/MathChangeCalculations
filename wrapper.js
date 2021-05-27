/* ============================================================================= 
	Wrapper for the Four Change Calculations

	This wrapper does the following to handle the algebra of mathematical change:
		1. Determines if exactly three of the variables are defined.
		2. Determines if exactly one of the variables is undefined.
		3. If conditions (1) and (2) aren't met, then throws a meaningful error.
		4. If conditions (1) and (2) are met, then it routes logic 
		to the correct function to derive the single undefined variable.

	This wrapper also handles...

	This wrapper is a conveniece layer that allows for a single function to be 
	called with indeterminate variables (as long as three of the four 
	are defined). Could be helpful if use case is passing in the four variables
	from a GUI.
============================================================================= */
const {
	percentGrowthByPeriod,
	start,
	end,
	periods,
} = require('./index');

const ERROR = {
	IsUndefinedOrANumber: 'Each value must be undefined or a number',
	ExactlyOneUndefined: 'Exactly one of the four values must be undefined',
};

/**
 * Calculates the percent growth over some period of time
 * @param  {Number} Start Amount
 * @param  {Number} End Amount
 * @param  {Number} Number of periods
 * @param  {Number} Percent growth
 * @return ???
 */
function calc(startNumber, endNumber, periods, percentGrowth) {
	const values = {startNumber, endNumber, periods, percentGrowth};
	const undefinedVal = chkValues(values);
	let val;

	switch(undefinedVal) {
	  case 'startNumber':
	    val = startNumber(endNumber, periods, percentGrowth);
	    break;
	  case 'endNumber':
	    val = endNumber(startNumber, periods, percentGrowth);
	    break;
	  case 'periods':
	    val = endNumber(startNumber, periods, percentGrowth);
	    break;
	  case 'percentGrowthByPeriod':
	    val = percentGrowthByPeriod(startNumber, periods, percentGrowth);
	    break;
	}

	console.log(`Calculated ${undefinedVal} as ${val} on these:`, values);
	return val;
}

/**
 * Checks the four values to ensure exactly one is undefined, and the 
 * rest are numeric. 
 * @param  {Object} Values: {startNumber, endNumber, periods, percentGrowth}
 * @return {String|Error} If no errs, returns the string of variable name
 */
function chkValues(obj) {
	const undefinedVals = [];

	for (const prop in obj) {
		const val = obj[prop];
		if (undefined === val) {
			undefinedVals.push(prop);
		} else if (isNaN(val)) {
			throw new Error(ERROR.IsUndefinedOrANumber);
		}
	}

	if (1 === undefinedVals.length) {
		// Return the only undefined value
		return undefinedVals[0];
	} else {
		throw new Error(ERROR.ExactlyOneUndefined);
	}
}

module.exports = {
	calc,
	ERROR,
};