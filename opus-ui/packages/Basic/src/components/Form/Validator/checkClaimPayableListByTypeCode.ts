import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';

// claim 匹配的claimPayableList是否有重复项
export const checkClaimPayableListByTypeCode = (
  listPolicy: any,
  curClaimPayableList: any,
  claimPayableListItem: any,
  policyNo: any,
  productCode: any
) => (rule: any, value: any, callback: Function) => {
  const policyTarget = lodash.find(listPolicy, {
    policyNo,
    coreProductCode: productCode,
    benefitTypeCode: value,
  });
  const calculateByPolicyYear = policyTarget?.calculateByPolicyYear;

  if (
    calculateByPolicyYear === 'Y' ||
    calculateByPolicyYear === 'F' ||
    claimPayableListItem.isAdjustment === 'Y'
  ) {
    callback();
    return;
  }
  const editPayable = formUtils.cleanValidateData(claimPayableListItem);
  // 剔除当前treatmentPayable
  const claimPayableList = lodash.filter(curClaimPayableList, (item) => item.id !== editPayable.id);
  const cleanClaimPayableList = formUtils.cleanValidateData(claimPayableList);
  const mappingPolicy = lodash.find(
    listPolicy,
    (item) =>
      item.policyNo === editPayable.policyNo &&
      item.coreProductCode === editPayable.productCode &&
      item.benefitTypeCode === value
  );
  editPayable.benefitCategory = lodash.get(mappingPolicy, 'benefitCategory');
  const payable = lodash.filter(
    cleanClaimPayableList,
    (payableItem) =>
      payableItem.incidentId === editPayable.incidentId &&
      payableItem.isAdjustment !== 'Y' &&
      filterDuplicatePayable(payableItem, { ...editPayable, benefitTypeCode: value })
  );
  if (payable.length > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
};
