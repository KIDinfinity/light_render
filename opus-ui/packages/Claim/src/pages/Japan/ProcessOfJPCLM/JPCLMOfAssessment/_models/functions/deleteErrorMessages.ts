import { forEach, some, isPlainObject, isEmpty, isString } from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import {
  checkPolicyNoDuplicate,
  checkClaimPayableDuplicate,
  checkLifePayableDuplicate,
  checkTreatmentPayableDuplicate,
} from './claimPayableFunc';

const UNIT = 'day';

export const deleteProcedure = (procedureTemp: any, procedureId: string) => {
  if (isEmpty(procedureTemp) || !isString(procedureId)) return procedureTemp;
  forEach(procedureTemp, (procedure: any) => {
    const { procedureCode, operationDate, id } = procedure;
    if (procedureId != id) {
      const exist = some(
        procedureTemp,
        (procedureItem) =>
          isPlainObject(procedureItem) &&
          id !== procedureItem.id &&
          moment(operationDate).isSame(formUtils.queryValue(procedureItem.operationDate), UNIT) &&
          formUtils.queryValue(procedureItem.procedureCode) === formUtils.queryValue(procedureCode)
      );
      if (!exist && operationDate && !isEmpty(operationDate.errors)) {
        operationDate.errors = null;
      }
    }
  });

  return procedureTemp;
};

export const delClaimPayablePolicy = (claimPayableTemp: any, incidentPayableId: string) => {
  if (isEmpty(claimPayableTemp) || !isString(incidentPayableId)) return claimPayableTemp;

  forEach(claimPayableTemp, (claimPayable: any) => {
    const { policyNo, id } = claimPayable;
    if (incidentPayableId != id) {
      const exist = checkPolicyNoDuplicate(claimPayableTemp, claimPayable);
      if (!exist && policyNo && !isEmpty(policyNo.errors)) {
        policyNo.errors = null;
      }
    }
  });

  return claimPayableTemp;
};

export const delClaimPayableProduct = (claimPayableTemp: any, incidentPayableId: string) => {
  if (isEmpty(claimPayableTemp) || !isString(incidentPayableId)) return claimPayableTemp;

  forEach(claimPayableTemp, (claimPayable: any) => {
    const { productCode, id } = claimPayable;
    if (incidentPayableId != id) {
      const exist =
        claimPayable.policySetupStatus === PolicySetupStatus.NoImplement &&
        checkClaimPayableDuplicate(claimPayableTemp, claimPayable);
      if (!exist && productCode && !isEmpty(productCode.errors)) {
        productCode.errors = null;
      }
    }
  });

  return claimPayableTemp;
};

export const delClaimPayableBenefitType = (claimPayableTemp: any, incidentPayableId: string) => {
  if (isEmpty(claimPayableTemp) || !isString(incidentPayableId)) return claimPayableTemp;

  forEach(claimPayableTemp, (claimPayable: any) => {
    const { benefitTypeCode, policySetupStatus, id } = claimPayable;
    if (incidentPayableId != id) {
      const exist =
        policySetupStatus === PolicySetupStatus.Standard &&
        checkClaimPayableDuplicate(claimPayableTemp, claimPayable);
      if (!exist && benefitTypeCode && !isEmpty(benefitTypeCode.errors)) {
        benefitTypeCode.errors = null;
      }
    }
  });

  return claimPayableTemp;
};

export const delLifePayableBenefitItem = (claimPayableTemp: any, incidentPayableId: string) => {
  if (isEmpty(claimPayableTemp) || !isString(incidentPayableId)) return claimPayableTemp;

  forEach(claimPayableTemp, (claimPayable: any) => {
    const { lifePayable, id } = claimPayable;
    if (lifePayable && incidentPayableId != id) {
      const { benefitItemCode } = lifePayable;
      const exist = checkLifePayableDuplicate(claimPayableTemp, claimPayable);
      if (!exist && benefitItemCode && !isEmpty(benefitItemCode.errors)) {
        benefitItemCode.errors = null;
      }
      claimPayable.lifePayable = lifePayable;
    }
  });

  return claimPayableTemp;
};

export const delTreatmentPayableBenefitItem = (
  treatmentPayableTemp: any,
  treatmentPayableItemId: string
) => {
  if (isEmpty(treatmentPayableTemp) || !isString(treatmentPayableItemId))
    return treatmentPayableTemp;

  forEach(treatmentPayableTemp, (treatmentPayable: any) => {
    const { benefitItemCode, id } = treatmentPayable;
    if (treatmentPayableItemId != id) {
      const exist = checkTreatmentPayableDuplicate(treatmentPayableTemp, treatmentPayable);
      if (!exist && benefitItemCode && !isEmpty(benefitItemCode.errors)) {
        benefitItemCode.errors = null;
      }
    }
  });

  return treatmentPayableTemp;
};

export default {
  deleteProcedure,
  delClaimPayablePolicy,
  delClaimPayableProduct,
  delClaimPayableBenefitType,
  delLifePayableBenefitItem,
  delTreatmentPayableBenefitItem,
};
