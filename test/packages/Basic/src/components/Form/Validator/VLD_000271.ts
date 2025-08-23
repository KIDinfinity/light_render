import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ClaimDecision } from 'claim/pages/utils/claim';

export const VLD_000271 = (assessmentDecision: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (
    (assessmentDecision === ClaimDecision.approve ||
      assessmentDecision?.[0] === ClaimDecision.approve) &&
    value === '00001'
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000252' }));
  }
  callback();
};
