/* =============================================================================
  Abstracted Mathematical Change Calculations

  * These four primary functions can handle all cases algebraically
  where three of four numbers are known: start, end, percent change,
  and periods.
  * Exactly one of these four variables can be undefined at a higher level and
  routed to one of the four functions below to derive the undefined value.
  * The precision of some calculations may be affected by floating point
  operations!
  * The use of the change variable should be synonymous with
  a change factor.
============================================================================= */
module.exports = {
  percentChangeByPeriod,
  start,
  end,
  periods
};

/**
 * Derive percent change over periods
 * @param  {Number} Start
 * @param  {Number} End
 * @param  {Number} Periods
 * @return {Number} Percent Change
 */
function percentChangeByPeriod (start, end, periods = 1) {
  const change = end / start;
  const exponent = 1 / periods;
  const changeFactor = Math.pow(change, exponent);
  const percentChangeByPeriod = (changeFactor - 1) * 100;
  return percentChangeByPeriod;
}

/**
 * Derive start number on end, periods, and percent change
 * @param  {Number} End
 * @param  {Number} Periods
 * @param  {Number} Percent Change
 * @return {Number} Start Amt
 */
function start (end, periods, percent) {
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
function end (start, periods, percent) {
  const change = changeFactorOnPercent(percent);
  const end = Math.pow(change, periods) * start;
  return end;
}

/**
 * Derive periods on start, end, and percent change
 * Math.log is the natural log (ln) having a base of e
 * @param  {Number} Start
 * @param  {Number} End
 * @param  {Number} Percent Change
 * @return {Number} Periods
 */
function periods (start, end, percent) {
  const change = end / start;
  const changeByPeriod = changeFactorOnPercent(percent);
  const lnChange = Math.log(change);
  const lnChangeByPeriod = Math.log(changeByPeriod);
  const periods = lnChange / lnChangeByPeriod;
  // Leaving console.log() for ellucidation
  // console.log({start, end, percent, change, changeByPeriod, lnChange, lnChangeByPeriod, periods});
  return periods;
}

/**
 * A changeFactorOnPercent of 1 indicates 0 change.
 * Anything multiplied by 1 is itself. No change.
 * A changeFactorOnPercent of 0, means a -100%
 * @param  {Number} Percent
 * @return {Number} Change factor on percent
 */
function changeFactorOnPercent (percent) {
  // If change is 100%, then we want a doubling for each period,
  // hence the addition of 1 for a changeFactor of 2. A doubling.
  // If change is 200%, then we want a tripling for each period,
  // hence the addition of 1 for a changeFactor of 3. A tripling.
  // And so on.
  const changeFactorOnPercent = (percent / 100) + 1;
  return changeFactorOnPercent;
}
