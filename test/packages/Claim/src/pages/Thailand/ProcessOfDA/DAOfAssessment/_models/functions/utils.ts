import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { BenefitCategory } from '../dto';

export const getMappingPolicy = (editPayable: any, listPolicy: any) => {
  const curPolicyNo = formUtils.queryValue(editPayable.policyNo);
  const curBenefitTypeCode = formUtils.queryValue(editPayable.benefitTypeCode);
  return lodash.find(
    listPolicy,
    (item) => item.policyNo === curPolicyNo && item.benefitTypeCode === curBenefitTypeCode
  );
};

export const getMappingPolicyData = ({ item, listPolicy, extraPick = [], extraData = [] }: any) => {
  const clearData = formUtils.cleanValidateData(item);

  const pickData = ['policyNo', 'benefitTypeCode', ...extraPick];
  const defaultMap = ['coverageKey', 'referenceDate', 'productPlan', ...extraData];

  const policyItem = lodash.find(listPolicy, lodash.pick(clearData, pickData)) || {};

  return {
    ...lodash.pick(policyItem, [...defaultMap, ...extraData]),
    productCode: policyItem?.coreProductCode,
  };
};

export const newPayableBoolean = (
  editPayableItem: any,
  newClaimEntities: any,
  incidentPayableId: any
) => {
  const editPayable = formUtils.cleanValidateData(editPayableItem);
  const incidentPayableItem = newClaimEntities.claimPayableListMap[incidentPayableId];
  const { treatmentPayableList, benefitCategory } = incidentPayableItem;

  let payableBoolean =
    benefitCategory === BenefitCategory.reimbursement &&
    lodash.some(treatmentPayableList, (item) =>
      lodash.isEmpty(
        lodash.get(newClaimEntities, `treatmentPayableListMap[${item}].invoicePayableList`)
      )
    );

  if (editPayable.policyNo && editPayable.benefitTypeCode && lodash.isEmpty(treatmentPayableList)) {
    payableBoolean = true;
  }
  return payableBoolean;
};

// claimPayable重复性校验，重复返回false，不重复返回true
export const validatePayableDuplicate = (claimPayableItem, claimPayableListMap) =>
  lodash.some(
    claimPayableListMap,
    (payableItem) =>
      payableItem.id !== claimPayableItem.id &&
      payableItem.incidentId === claimPayableItem.incidentId &&
      formUtils.queryValue(payableItem.policyNo) ===
        formUtils.queryValue(claimPayableItem.policyNo) &&
      formUtils.queryValue(payableItem.benefitTypeCode) ===
        formUtils.queryValue(claimPayableItem.benefitTypeCode)
  );
