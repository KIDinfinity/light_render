import { getDuration, getAmount } from 'basic/utils';
import { DataFormat } from '../Enum';

export default ({ dataFormat, value, format }: any) => {
  const formatMap = {
    [DataFormat.duration]: getDuration({ duration: value, format, isMin: true,needDecimal:false }),
    [DataFormat.amount]: getAmount(value),
    [DataFormat.percentage]: `${value * 100}%`,
    [DataFormat.percent]: `${value * 100}%`,
    [DataFormat.number]: Math.floor(value),
  };
  return formatMap[dataFormat] || value;
};
