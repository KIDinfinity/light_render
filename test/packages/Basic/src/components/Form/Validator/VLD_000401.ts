import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 * 手动改为Approve时， claim Decision，存在ExGratia
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000401 = (claimPayableListMap: any = {}, keyName?: string) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value === ClaimDecision.approve) {
    const getDecision = (item: any) => {
      return formUtils.queryValue(item[keyName || 'claimDecision']);
    };
    const isexGratia = lodash.some(
      claimPayableListMap,
      (item) => getDecision(item) === ClaimDecision.exGratia
    );
    if (isexGratia) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000426' }));
    }
  }
  callback();
};
