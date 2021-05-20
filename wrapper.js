const ERROR = {
	IsUndefinedOrANumber: 'Each value must be undefined or a number'
};

/**
 * Calculates the percent growth over some period of time
 * @param  {Number} Start Amount
 * @param  {Number} End Amount
 * @param  {Number} Number of periods
 * @param  {Number} Percent growth
 * @return ???
 */
function calc(startNumber, endNumber, periods = 1, percentGrowth) {
	console.log({startNumber, endNumber, periods, percentGrowth});
	// chkValues(startNumber, endNumber, periods = 1, percentGrowth)


	if (undefined === percentGrowth) {
		console.log('Calculating percent growth over N-periods');
		return percentGrowthByPeriod(startNumber, endNumber, periods);
	} else {

	}
}

function chkValues(startNumber, endNumber, periods, percentGrowth) {
	if ([startNumber, endNumber, periods, percentGrowth].every(isUndefinedOrANumber)) {

	}
	else {
		throw new Error(ERROR.IsUndefinedOrANumber);
	}
}

function isUndefinedOrANumber(val) {
	return undefined === val || !isNaN(val);
}