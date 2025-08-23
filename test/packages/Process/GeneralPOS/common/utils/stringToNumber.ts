import lodash from 'lodash';

function round(number, precision) {
  return Number(Math.round(+number + 'e' + precision) / Math.pow(10, precision)).toFixed(precision);
}

export default (data, precision) => {
  if (lodash.isNaN(data) || [1 / 0, -1 / 0].includes(data))
    return `0.${new Array(precision).fill('0').join('')}`;
  if (lodash.isNil(data) || lodash.isUndefined(data) || data === '') return '';
  let result = String(data);
  if (precision !== undefined) {
    if (result.includes('.')) {
      const [int, pre] = result.split('.');
      result =
        pre.length >= precision
          ? String(round(Number(result), precision))
          : `${int}.${pre}${new Array(precision - pre.length).fill('0').join('')}`;
    } else {
      result = `${result}.${new Array(precision).fill('0').join('')}`;
    }
  }

  result = result
    ?.replace(new RegExp(',*', 'g'), '')
    ?.replace(/\B(?<!(\.\d+))(?=(\d{3})+\b)/g, ',');
  return result;
};
