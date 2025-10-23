import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

/**
 * 手动改为ExGratia时， claim Decision，不存在 ExGratia
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000400 = (claimPayableListMap: any = {}, keyName?: string) => (
  rule: any,
  value: any,
  callback: Function
) => {
  if (value === ClaimDecision.exGratia) {
    const getDecision = (item: any) => {
      return formUtils.queryValue(item[keyName || 'claimDecision']);
    };
    const isexGratia = lodash.some(
      claimPayableListMap,
      (item) => getDecision(item) === ClaimDecision.exGratia
    );
    if (!isexGratia) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000424' }));
    }
  }
  callback();
};
