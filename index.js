/* ============================================================================= 
	Abstracted Mathematical Change Calculations

	* These four primary functions can handle all cases algebraically 
	where three of four numbers are known: start, end, percent growth, 
	and periods.
	* Exactly one of these four variables can be undefined at a higher level and 
	routed to one of the functions below to derive the undefined value.
	
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
 * Derive percent change over periods
 * @param  {Number} Start Amt
 * @param  {Number} End Amt
 * @param  {Number} Periods
 * @return {Number} Percent Growth
 */
function percentGrowthByPeriod(start, end, periods) {
	const change = end / start;
	const exponent = 1 / periods;
	const changeRateByPeriod = Math.pow(change, exponent) - 1;
	const percentGrowthByPeriod = changeRateByPeriod * 100;
	return percentGrowthByPeriod;
}

/**
 * Derive start number on end, periods, and percent change
 * @param  {Number} End
 * @param  {Number} Periods
 * @param  {Number} Percent Growth
 * @return {Number} Start Amt
 */
function start(end, periods, percent) {
	const change = changeFactorOnPercent(percent);
	const start = Math.pow(change, periods) / end;
	return start;
}

/**
 * Derive end number on start, periods, and percent change
 * @param  {Number} Start
 * @param  {Number} Periods
 * @param  {Number} Percent Change
 * @return {Number} End
 */
function end(start, periods, percent) {
	const change = changeFactorOnPercent(percent);
	const end = Math.pow(change, periods) * start;
	return end;
}

/**
 * Derive periods on start, end, and percent growth
 * Math.log is the natural log (ln) having a base of e
 * @param  {Number} Start Amt
 * @param  {Number} End Amt
 * @param  {Number} Percent Growth
 * @return {Number} Periods
 */
function periods(start, end, percent) {
	const change = changeFactorOnPercent(percent); 
	const lnChange = Math.log(change);
	const changeTotal = end / start;
	const lnChangeTotal = Math.log(changeTotal);
	const periods = lnChangeTotal / lnChange;
	// Leaving the console.log() below for ellucidation. 
	// console.log({change, lnChange, changeTotal, lnChangeTotal, periods});
	return periods;
}

/**
 * changeFactorOnPercent will always be 1 or greater.
 * A changeFactorOnPercent of 1 indicates 0 change. 
 * Anything multiplied by 1 is itself. No change.
 * @param  {Number} Start
 * @param  {Number} End
 * @return {Number} Change factor total
 */
function changeFactorOnPercent(percent) {
	// If change is 100%, then we want a doubling for each period, 
	// hence the addition of 1 for a value of 2. A doubling. 
	// If change is 200%, then we want a tripling for each period,
	// hence the addition of 1 for a value of 3. A tripling.
	// And so on.
	const changeFactorOnPercent = (percent / 100) + 1;
	return changeFactorOnPercent;
}


