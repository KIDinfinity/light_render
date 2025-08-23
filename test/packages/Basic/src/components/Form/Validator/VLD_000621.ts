import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000621 = () => (rule: any, value: any, callback: Function) => {
  const mobilePhone = new RegExp(/^0/);
  if (!mobilePhone.test(value) && value) {
    callback(formatMessageApi({ Label_COM_Message: 'MSG_000547' }));
    return;
  }
  callback();
};
