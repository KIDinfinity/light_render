import { some } from 'lodash';
import { formUtils } from 'basic/components/Form';

export const checkTreatmentPayableForNoImplement = (
  treatmentPayableListMap: any,
  treatmentPayableIds: string[],
  treatmentPayable: any
) => {
  const { treatmentId, policyNo, productCode } = treatmentPayable;
  return some(treatmentPayableIds, (id: string) => {
    const treatmentPayableItem = treatmentPayableListMap[id];
    return (
      treatmentPayableItem.treatmentId === treatmentId &&
      formUtils.queryValue(treatmentPayableItem.policyNo) === formUtils.queryValue(policyNo) &&
      formUtils.queryValue(treatmentPayableItem.productCode) === formUtils.queryValue(productCode)
    );
  });
};

export const checkTreatmentPayableDuplicate = (
  treatmentPayableListMap: any,
  treatmentPayableIds: string[],
  treatmentPayable: any
) => {
  const { treatmentId, policyNo, productCode, benefitTypeCode, benefitItemCode } = treatmentPayable;
  return some(treatmentPayableIds, (id: string) => {
    const treatmentPayableItem = treatmentPayableListMap[id];
    return (
      treatmentPayableItem.treatmentId === treatmentId &&
      formUtils.queryValue(treatmentPayableItem.policyNo) === formUtils.queryValue(policyNo) &&
      formUtils.queryValue(treatmentPayableItem.productCode) ===
        formUtils.queryValue(productCode) &&
      formUtils.queryValue(treatmentPayableItem.benefitTypeCode) ===
        formUtils.queryValue(benefitTypeCode) &&
      formUtils.queryValue(treatmentPayableItem.benefitItemCode) ===
        formUtils.queryValue(benefitItemCode)
    );
  });
};
