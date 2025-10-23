import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 * 手动改为Decline时， claim Decision，不存在 Decline
 *
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000182 = (
  validating: boolean,
  claimPayableListMap: any = {},
  keyName?: string
) => (rule: any, value: any, callback: Function) => {
  if (validating && value === ClaimDecision.deny) {
    const getDecision = (item: any) => {
      return formUtils.queryValue(item[keyName || 'claimDecision']);
    };
    const isAllDecline = lodash.every(
      claimPayableListMap,
      (item) => getDecision(item) === ClaimDecision.deny
    );
    if (!isAllDecline) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000422' }));
    }
  }
  callback();
};
