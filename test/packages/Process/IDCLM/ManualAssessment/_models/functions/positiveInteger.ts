export function positiveInteger(num: any, def: number = 0) {
  const numTemp = +num;
  const isNumber = !isNaN(numTemp);
  return isNumber && numTemp > 0 ? numTemp : def;
}

export default positiveInteger;
