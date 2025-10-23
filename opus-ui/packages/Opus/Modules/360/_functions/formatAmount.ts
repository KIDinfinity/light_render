import amount from 'amount';
import { isNumber } from 'lodash';

export default (num?: number | string | null, unit: string = '') => {
  if (!isNumber(num)) return '';
  return amount.currency(+num, {
    thousands_separator: ',',
    decimals_separator: '.',
    decimal_digits: 2,
    symbol: unit,
    symbol_on_left: false,
    symbol_space: ' ',
  });
};
