import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';

/**
 * 手动改为NA时， claim Decision，不全为NA
 * @param claimPayableListMap
 * @param keyName
 */
 export const VLD_000563 = (claimPayableListMap: any = {}, keyName?: string) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value === ClaimDecision.NA) {
    const getDecision = (item: any) => {
      return formUtils.queryValue(item[keyName || 'claimDecision']);
    };
    const isAllNA = lodash.every(
      claimPayableListMap,
      (item) => getDecision(item) === ClaimDecision.NA
    );
    if (!isAllNA) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000484' }));
    }
  }
  callback();
};
