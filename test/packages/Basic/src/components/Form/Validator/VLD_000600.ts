import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ClaimType } from 'claim/enum';

export const VLD_000600 = (dateOfConsultation: any, treatmentType: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value !== dateOfConsultation && treatmentType === ClaimType.OPD) {
    callback(formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000518' }));
  }
  callback();
};
