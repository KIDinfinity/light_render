import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000961 = () => (rule: any, value: any, callback: Function) => {
  const emailRule = new RegExp(/\.th@fwd.com/gi);

  if (emailRule.test(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001004' }));
    return;
  }
  callback();
};
