import { formatMessageApi } from '@/utils/dictFormatMessage';
export const VLD_001117 = (bankCode: any) => (rule: any, value: any, callback: Function) => {
  if (bankCode === 'AMX001' && !(/^34/.test(value) || /^37/.test(value))) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001048' }));
  }
  if (bankCode === 'SBC005' && !/^515603/.test(value)) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001048' }));
  }
  callback();
};
