import { filter, values, isArray } from 'lodash';
import { formUtils } from 'basic/components/Form';
/**
 * 找到所有含有当前treatment payable的 incident payable
 */
export default (claimPayableListMap: any, treatmentPayable: any) => {
  const claimPayableList = values(formUtils.cleanValidateData(claimPayableListMap));
  const payables = filter(
    claimPayableList,
    (item: any) =>
      item.incidentId === treatmentPayable.incidentId &&
      item.policyNo === treatmentPayable.policyNo &&
      item.productCode === treatmentPayable.productCode &&
      item.benefitTypeCode === treatmentPayable.benefitTypeCode
  );

  return isArray(payables) && payables.length === 1 ? payables[0] : null;
};

export const findClaimPayableByPolicyNo = (claimPayableListMap: any, treatmentPayable: any) => {
  const claimPayableList = values(formUtils.cleanValidateData(claimPayableListMap));
  const payables = filter(
    claimPayableList,
    (item: any) =>
      item.incidentId === treatmentPayable.incidentId && item.policyNo === treatmentPayable.policyNo
  );
  return isArray(payables) && payables.length === 1 ? payables[0] : null;
};

export const findClaimPayableByProduct = (claimPayableListMap: any, treatmentPayable: any) => {
  const claimPayableList = values(formUtils.cleanValidateData(claimPayableListMap));
  const payables = filter(
    claimPayableList,
    (item: any) =>
      item.incidentId === treatmentPayable.incidentId &&
      item.policyNo === treatmentPayable.policyNo &&
      item.productCode === treatmentPayable.productCode
  );
  return isArray(payables) && payables.length === 1 ? payables[0] : null;
};
