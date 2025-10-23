import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_001202 = (data) => (rule: any, value: any, callback: Function) => {
  const usTax = formUtils.cleanValidateData(data);

  if (usTax?.taxDeclarationsFlag === 'Y' && !usTax?.cardNo && !usTax?.identificationNumber) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000281' }));
  }
  callback();
};
