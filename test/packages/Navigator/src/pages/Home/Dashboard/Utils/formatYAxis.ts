import { getDuration, getAmount, getDecimal } from 'basic/utils';
import { DataFormat } from '../Enum';
import lodash from 'lodash';

export default ({ dataFormat, value, format }: any) => {
  const formatMap: any = {
    [DataFormat.duration]: getDuration({
      duration: value,
      format,
      isMin: true,
      needDecimal: false,
    }),
    [DataFormat.amount]: getAmount(value),
    [DataFormat.percentage]: `${parseFloat(Number(value * 100).toFixed(3))}%`,
    [DataFormat.percent]: `${value * 100}%`,
    [DataFormat.number]: Math.floor(value),
    [DataFormat.decimal]: getDecimal({ value, format }),
  };
  return lodash.has(formatMap, dataFormat) ? formatMap[dataFormat] : value;
};
