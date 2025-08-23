import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';
import { BenefitCategory } from 'claim/pages/utils/claim';
// 验证treatment 匹配的treatmentPayableList是否有重复项
export const checkTretmentPayableListByTypeCode = (
  listPolicy: any,
  curTreatmentPayableList: any,
  treatmentPayableListItem: any
) => (rule: any, value: any, callback: Function) => {
  const editPayable = formUtils.cleanValidateData(treatmentPayableListItem);
  // 剔除当前treatmentPayable
  const treatmentPayableList = lodash.filter(
    curTreatmentPayableList,
    (item) => item.id !== editPayable.id
  );
  const cleanTreatmentPayableList = formUtils.cleanValidateData(treatmentPayableList);

  const mappingPolicy = lodash.find(
    listPolicy,
    (item) =>
      item.policyNo === editPayable.policyNo &&
      item.coreProductCode === editPayable.productCode &&
      item.benefitTypeCode === value
  );
  editPayable.benefitCategory = lodash.get(mappingPolicy, 'benefitCategory');

  if (editPayable.benefitCategory === BenefitCategory.reimbursement) {
    const payable = lodash.filter(
      cleanTreatmentPayableList,
      (payableItem) =>
        payableItem.treatmentId === editPayable.treatmentId &&
        filterDuplicatePayable(payableItem, { ...editPayable, benefitTypeCode: value })
    );
    if (payable.length > 0) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
    }
  }
  callback();
};
