/* ============================================================================= 
	Abstracted Mathematical Change Calculations

	These four primary functions can handle all cases algebraically 
	where three of four numbers are known: start, end, percent growth, 
	and periods.
	Exactly one of these four variables can be undefined at a higher level and 
	routed to the correct function to derive the undefined value.
	
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
 * Calculates the percent change over periods of time
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
 * Math.log is the natural log (ln) having a base of e
 * @param  {Number} Start Amt
 * @param  {Number} End Amt
 * @param  {Number} Percent Growth
 * @return {Number} Periods
 */
function periods(start, end, percent) {
	const growthFactorPerPeriod = (percent / 100) + 1; 
	const lnOfGrowthFactor = Math.log(growthFactorPerPeriod);
	const changeFactor = end / start;
	const lnOfChangeFactor = Math.log(changeFactor);
	const periods = lnOfChangeFactor / lnOfGrowthFactor;
	// Leaving the console.log() below for ellucidation. 
	// console.log({growthFactorPerPeriod, lnOfGrowthFactor, changeFactor, lnOfChangeFactor, periods})
	return periods;
}

/**
 * Takes a start and end number and returns the change factor
 * The changeFactorTotal will always be 1 or greater
 * A changeFactorTotal of 1 indicates 0 change
 * @param  {Number} Start
 * @param  {Number} End
 * @return {Number} Change factor total
 */
function changeFactorTotal(start, end) {
	// If percent change is 100, then we want a doubling for each period, 
	// hence the addition of one for a value of 2, or a doubling. 
	// If percent change is 200, then we want a tripling for each period,
	// hence the addition of one for a value of 3, or a tripling.
	const changeFactorTotal = end / start;
	return changeFactorTotal;
}

