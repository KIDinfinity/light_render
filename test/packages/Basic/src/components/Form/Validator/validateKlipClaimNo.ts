import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const validateKlipClaimNo = (
  claimRelationshipKlipClaimNoList: any,
  id: string,
  claimNo: string
) => (rule: any, value: any, callback: Function) => {
  if (!lodash.isArray(claimRelationshipKlipClaimNoList)) {
    return callback();
  }

  const klipClaimNoList = lodash.values(
    formUtils.cleanValidateData(claimRelationshipKlipClaimNoList)
  );

  const isDuplicate = lodash
    .chain(klipClaimNoList)
    .filter((KlipClaimNoObj: any) => {
      return KlipClaimNoObj.klipClaimNo === value && KlipClaimNoObj.id !== id;
    })
    .size()
    .value();

  if (klipClaimNoList.length > 0 && isDuplicate) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000465' }, value, claimNo || ''));
    return formatMessageApi({ Label_COM_WarningMessage: 'MSG_000465' }, value, claimNo || '');
  }
  callback();
  return false;
};
