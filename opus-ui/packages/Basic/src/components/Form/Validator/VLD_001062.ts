import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_001062 =
  (claimRelationshipKlipClaimNoList: any, id: string) =>
  (rule: any, value: any, callback: Function) => {
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
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001162' }));
      return formatMessageApi({ Label_COM_WarningMessage: 'MSG_001162' });
    }
    callback();
    return false;
  };
