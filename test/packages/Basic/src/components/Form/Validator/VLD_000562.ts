import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';

/**
 * submit 时 assessment decision = NA 且 所有的claim decision都为 NA
 * @param claimPayableListMap
 * @param keyName
 */
 export const VLD_000562 = (
  submited: boolean,
  validating: boolean,
  isClickRegister: boolean = false,
  claimPayableListMap: any = {},
  keyName?: string
) => (rule: any, value: any, callback: Function) => {
  if (!isClickRegister && submited && validating && value === ClaimDecision.NA) {
    const getDecision = (item: any) => {
      return formUtils.queryValue(item[keyName || 'claimDecision']);
    };
    const isAllNA = lodash.every(
      claimPayableListMap,
      (item) => getDecision(item) === ClaimDecision.NA
    );
    if (isAllNA) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000483' }));
      return;
    }
  }
  callback();
};
