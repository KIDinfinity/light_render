import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000618 = () => (rule: any, value: any, callback: Function) => {
  const emailRule = new RegExp(
    /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*.){1,63}[a-zA-Z0-9]+$/
  );

  if (!emailRule.test(value) && value) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000302' }));
    return;
  }
  callback();
};
