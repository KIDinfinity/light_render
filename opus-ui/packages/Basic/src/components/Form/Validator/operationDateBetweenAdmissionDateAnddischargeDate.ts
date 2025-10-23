import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ClaimType } from 'claim/enum';

export const operationDateBetweenAdmissionDateAnddischargeDate = (
  dateOfAdmission: any,
  dateOfDischarge: any,
  treatmentType: any
) => (rule: any, value: any, callback: Function) => {
  if (treatmentType === ClaimType.IPD && (dateOfAdmission > value || value > dateOfDischarge)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000086' }));
  }
  callback();
};
