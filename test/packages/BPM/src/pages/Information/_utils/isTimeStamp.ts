import lodash from 'lodash';

/**
 * 用于判断auditlog中的数字是否为时间戳（主要是为了生日的显示），非auditlog的数字判断需要先阅读代码看看是否符合自己的场景。时间戳可以是0，正负整数，
 * 而我们的一些field也是数字，所以不能准确判断，有可能出现符合时间戳长度的数字同时也是其他filed的正常数字，这里通过判断是否是小数过滤掉了部分，
 * 但如果后期出现问题难以修复，则考虑为auditlog中DOB这个特殊的filed判断filed名直接转时间格式，弃用这个函数不做这个判断
 * @param {number} timeStampNumber 可能为时间戳的数字
 * @return {boolean}
 */
const IsTimeStamp = (timeStampNumber: number) => {
  //判断是否是数字
  if (!lodash.isNumber(timeStampNumber)) {
    return false;
  }
  //判断是否是小数
  const isDecimal = String(timeStampNumber).includes('.');
  if (isDecimal) {
    return false;
  }
  //判断是否能转化成合法日期, 比如数字太大转成的日期为Invalid Date
  const date = new Date(timeStampNumber);
  if (isNaN(date)) {
    return false;
  }
  //   判断长度，1970年以后时间戳通常为10-13位。
  const timeStampStrLength = timeStampNumber?.toString()?.length;
  if (timeStampStrLength < 10 || timeStampStrLength > 13) {
    return false;
  }
  return true;
};

export default IsTimeStamp;
