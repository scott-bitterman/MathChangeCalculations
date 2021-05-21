/* ============================================================================= 
	Abstracted Mathematical Change Calculations
	These four functions can handle all cases algebraically where three of four 
	variables are known: Start number, end number, percent growth, and periods.
	Note: The precision of some calculations may be affected by floating point 
	operations.
============================================================================= */
module.exports = {
	percentGrowthByPeriod,
	start,
	end,
	periods,
};

/**
 * Calculates the percent growth over periods of time
 * @param  {Number} Start Amt
 * @param  {Number} End Amt
 * @param  {Number} Periods
 * @return {Number} Percent Growth
 */
function percentGrowthByPeriod(start, end, periods) {
	const growth = end / start;
	const exponent = 1 / periods;
	const growthRatePerPeriod = Math.pow(growth, exponent) - 1;
	const percentGrowthByPeriod = growthRatePerPeriod * 100;
	return percentGrowthByPeriod;
}

/**
 * Calculate beginning number based on end, periods, and percent growth
 * @param  {Number} End Amt
 * @param  {Number} Periods
 * @param  {Number} Percent Growth
 * @return {Number} Start Amt
 */
function start(end, periods, percent) {
	const growth = percent / 100;
	const start = Math.pow(growth + 1, periods) / end;
	return start;
}

/**
 * Calculate end number based on start, periods, and percent growth
 * @param  {Number} Start Amt
 * @param  {Number} Periods
 * @param  {Number} Percent Growth
 * @return {Number} End Amt
 */
function end(start, periods, percent) {
	const growth = percent / 100;
	const end = Math.pow(growth + 1, periods) * start;
	return end;
}

/**
 * Calculate periods based on start, end, and percent growth
 * @param  {Number} Start Amt
 * @param  {Number} End Amt
 * @param  {Number} Percent Growth
 * @return {Number} Periods
 */
function periods(start, end, percent) {
	const growth = end / start;
	const percentGrowth = (percent / 100) + 1;
	const periods = Math.log(growth) / Math.log(percentGrowth);
	return periods;
}



