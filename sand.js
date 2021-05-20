// console.log(periods(1,20,100))
let x = Math.log(1000) / Math.log(10)

console.log(x)



/**
 * Calculate periods based on start, end, and percent growth
 * @param  {Number} Start Amt
 * @param  {Number} End Amt
 * @param  {Number} Percent Growth
 * @return {Number} Periods
 */
function periods(start, end, percent) {
	const growth = (percent/100)+1;
	const totalGrowth = end/start;
	const periods = Math.log(totalGrowth) / Math.log(growth);
	return periods;
}