import { OptionEnum } from 'process/GeneralPOS/common/Enum';

export default {
  [OptionEnum.Unit]: (value, price) =>
    value === 0 ? 0 : Number(value || 0) * Number(price || 0) || '',
  [OptionEnum.Amount]: (value) => (value === 0 ? 0 : Number(value) || ''),
  [OptionEnum.Percent]: (value, price, unitHolding) =>
    value === 0
      ? 0
      : (Number(value || 0) * Number(unitHolding || 0) * Number(price || 0)) / 100 || '',
};
