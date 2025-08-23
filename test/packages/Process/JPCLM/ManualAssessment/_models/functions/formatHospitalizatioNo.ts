/**
 * 格式化数据
 */
import lodash from 'lodash';

export default ({ no, isFormatter, value }: any) => {
  const formatZero = () => {
    const size = lodash.size(String(no ?? value));
    if (size > 0 && size < 5) return '0'.repeat(5 - size);
    return '';
  };
  const zeroSize = formatZero();

  if (!isFormatter) return value.replace(zeroSize, '');
  const newStr = `${zeroSize}${value}`;
  const valSize = lodash.size(String(newStr));
  if (valSize > 5) return newStr.slice(valSize - 5);
  return newStr;
};
