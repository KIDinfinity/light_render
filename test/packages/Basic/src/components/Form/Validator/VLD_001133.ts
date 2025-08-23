import { formatMessageApi } from '@/utils/dictFormatMessage';

export function validateValue(value: string): boolean {
  if (!value) {
    return true;
  }

  // 检查是否只包含字母或数字
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  if (!alphanumericRegex.test(value)) {
    return false;
  }

  // 定义允许的前缀
  const allowedPrefixes = [
    'C',
    'CS',
    'D',
    'F',
    'FA',
    'PT',
    'TA',
    'TC',
    'TN',
    'TR',
    'TP',
    'J',
    'LE',
  ];
  // 按长度从长到短排序前缀，确保正则优先匹配最长的前缀
  allowedPrefixes.sort((a, b) => b.length - a.length);
  // 检查是否以允许的前缀开头
  const prefixRegex = new RegExp(`^(${allowedPrefixes.join('|')})`);
  const prefixMatch = value.match(prefixRegex);
  if (!prefixMatch) {
    return false;
  }

  // 检查前缀后的第一个字符是否为 0
  const prefixLength = prefixMatch[0].length;
  if (value.length > prefixLength && value[prefixLength] === '0') {
    return false;
  }

  // 检查最后一个字符是否为 0
  if (!value.endsWith('0')) {
    return false;
  }

  return true;
}

export const VLD_001133 = () => (rule: any, value: any, callback: Function) => {
  if (!validateValue(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001297' }));
  }
  callback();
};
