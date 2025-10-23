import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 * 手动改为Approve时， claim Decision，Approve和ExGratia都不存在
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000010HKApproveAndExGratia = (claimPayableListMap: any = {}, keyName?: string) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value === ClaimDecision.approve) {
    const getDecision = (item: any) => {
      return formUtils.queryValue(item[keyName || 'claimDecision']);
    };
    const isApprove = lodash.some(
      claimPayableListMap,
      (item) => getDecision(item) === ClaimDecision.approve
    );
    const isexGratia = lodash.some(
      claimPayableListMap,
      (item) => getDecision(item) === ClaimDecision.exGratia
    );
    if (!isApprove && !isexGratia) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000019' }));
    }
  }
  callback();
};
