import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 *
 * @param claimPayableListMap 事故理算列表
 */
export const VLD_000010 = (claimPayableListMap: any = {}, keyName?: string) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value === ClaimDecision.approve) {
    const getDecision = (item: any) => {
      return formUtils.queryValue(item[keyName || 'claimDecision']);
    };
    const isApprove = lodash.some(claimPayableListMap, (item) => getDecision(item) === value);
    if (!isApprove) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000019' }));
    }
  }
  callback();
};
