import { formatMessageApi } from '@/utils/dictFormatMessage';

const validateStringFormat = (str: string): boolean => {
  const regex = /^[A-Za-z]{1,3}\d*$/; // 正则表达式：前1-3位是字母，后面是数字（可选）
  return regex.test(str);
};

export const VLD_001149 = () => (rule: any, value: any, callback: Function) => {
  if (!!value && !validateStringFormat(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001311' }));
  }
  callback();
};
