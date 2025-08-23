import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000597 = (incidentId: string, claimPayableListMap: any[], submited: boolean) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const hasSpecEndorseIsY = lodash
    .chain(claimPayableListMap)
    .values()
    .filter((item) => {
      return item?.incidentId === incidentId;
    })
    .some((item) => item?.specEndorse === 'Y')
    .value();
  if (submited && value === 1 && !hasSpecEndorseIsY) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000516' }));
  }
  callback();
};
