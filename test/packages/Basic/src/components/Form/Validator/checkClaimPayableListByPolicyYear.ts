import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// claim 匹配的claimPayableList是否有重复项
export const checkClaimPayableListByPolicyYear = (
  listPolicy: any,
  curClaimPayableList: any,
  claimPayableListItem: any
) => (rule: any, value: any, callback: Function) => {
  const { id, policyNo, productCode, benefitTypeCode } = formUtils.cleanValidateData(
    claimPayableListItem
  );
  const claimPayableList = lodash.filter(curClaimPayableList, (item) => item.id !== id);

  if (
    lodash.find(claimPayableList, { policyNo, productCode, benefitTypeCode, policyYear: value })
  ) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
};
