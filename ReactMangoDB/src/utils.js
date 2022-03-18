/**
 * get days diff between date objects
 * @param d1
 * @param d2
 * @returns {number}
 */
export function getDayDiff (d1, d2) {
  return (d1 - d2) / (1000 * 60 * 60 * 24);
}