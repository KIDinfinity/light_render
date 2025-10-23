import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000056HK = (dateOfAdmission: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value < dateOfAdmission) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000080' }));
  }
  callback();
};
