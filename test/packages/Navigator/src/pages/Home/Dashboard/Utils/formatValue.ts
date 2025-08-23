import { getDuration, getAmount, getDecimal } from 'basic/utils';
import { DataFormat } from '../Enum';
import lodash from 'lodash';

export default ({ value = 0, total, dataFormat = 'number', decimal, format, lineBreak }: any) => {
  const isZero = total === 0;
  const valuePercent = `${(value * 100).toFixed(decimal || 1)}%`;

  const numberPercentage = lineBreak ? `${value}\n${valuePercent}` : `${value}(${valuePercent})`;
  const formatMap = {
    // 处理百分比:.2357 -> .2357(23.6%)
    [DataFormat.number_percentage]: isZero ? 0 : numberPercentage,
    // 处理百分比: .2357 -> 23.6%
    [DataFormat.percentage]: isZero ? 0 : valuePercent,
    [DataFormat.percent]: isZero ? 0 : valuePercent,
    // 不变
    [DataFormat.number]: Math.floor(value),
    // 将持续时间(时间戳)转化为指定格式的字符串
    [DataFormat.duration]: getDuration({ duration: value, format, isMin: true }),
    // 处理为带有千分位逗号分隔的字符串:1234567.89, 2 -> 1,234,567.89
    [DataFormat.amount]: getAmount(value),
    [DataFormat.report_number_format_amount]: getAmount(value),
    // 处理百分比: .2357 -> 23.6%
    [DataFormat.cal_percentage]: isZero ? 0 : valuePercent,
    // 保留小数点位数
    [DataFormat.decimal]: getDecimal({ value, format }),
  };

  return lodash.has(formatMap, dataFormat) ? formatMap[dataFormat] : value;
};
