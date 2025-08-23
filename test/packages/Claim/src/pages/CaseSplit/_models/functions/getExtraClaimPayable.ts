import lodash, { values, isPlainObject, isEmpty, isArray } from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (claimPayableListMap: any, existTreatment: any) => {
  if (
    !isPlainObject(claimPayableListMap) &&
    isEmpty(claimPayableListMap) &&
    !isArray(existTreatment)
  )
    return [];
  return formUtils
    .cleanValidateData(values(claimPayableListMap))
    .filter((claim: any) =>
      existTreatment.every(
        (treatment: any) =>
          lodash.isString(treatment.payableId) &&
          lodash.isString(claim.id) &&
          treatment.payableId &&
          claim.id &&
          treatment.payableId !== claim.id
      )
    );
};
