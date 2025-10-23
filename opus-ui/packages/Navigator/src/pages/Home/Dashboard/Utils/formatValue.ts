import { getDuration, getAmount, getDecimal } from 'basic/utils';
import { DataFormat } from '../Enum';

export default ({ value = 0, total, dataFormat = 'number', format, lineBreak }: any) => {
  const isZero = total === 0;
  const valuePercent = `${((value / total) * 100).toFixed(1)}%`;

  const perValue = `${(value * 100).toFixed(1)}%`;

  const numberPercentage = lineBreak ? `${value}\n${valuePercent}` : `${value}(${valuePercent})`;
  const formatMap = {
    [DataFormat.number_percentage]: isZero ? 0 : numberPercentage,
    [DataFormat.percentage]: isZero ? 0 : perValue,
    [DataFormat.percent]: isZero ? 0 : perValue,
    [DataFormat.number]: `${value || 0}`,
    [DataFormat.duration]: getDuration({ duration: value, format, isMin: true }),
    [DataFormat.amount]: getAmount(value),
    [DataFormat.report_number_format_amount]: getAmount(value),
    [DataFormat.cal_percentage]: isZero ? 0 : valuePercent,
    [DataFormat.decimal]: getDecimal({ value, format }),
  };

  return formatMap[dataFormat];
};
