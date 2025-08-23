import React, { useMemo } from 'react';
import { getAllFormErrors } from '@/utils/medicalSearch';
import { collectSectionErrorsOfJPCA } from '@/utils/validationsOfProcess';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import bpm from 'bpm/pages/OWBEntrance';
import { denormalizeClaimData } from './_models/functions/normalizeFunc';

const EntryErrorsUpdate = () => {
  const {
    claimProcessData,
    claimEntities,
    submited,
    validateResult,
    allocationErrors,
  } = useSelector((state: any) => ({
    claimProcessData: state.JPCLMOfClaimAssessmentController.claimProcessData,
    claimEntities: state.JPCLMOfClaimAssessmentController.claimEntities,
    submited: state.formCommonController.submited,
    validateResult: state.medicalValidate.validateResult,
    claimDataStatusIsLoadEnd: state.claimDataStatus.isLoadEnd,
    allocationErrors: state.paymentAllocation.errors,
  }));
  const denormalizedData = useMemo(() => denormalizeClaimData(claimProcessData, claimEntities), [
    claimProcessData,
    claimEntities,
  ]);
  const errors = useMemo(() => {
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    let errorsTotal = formUtils.getErrorArray(denormalizedData);
    const sectionErrors = collectSectionErrorsOfJPCA(claimData, submited);
    const serviceValidateErrors = getAllFormErrors({ validateMessages: validateResult });
    if (lodash.isArray(sectionErrors) && sectionErrors.length > 0) {
      errorsTotal = [...errorsTotal, ...sectionErrors];
    }
    errorsTotal = [...errorsTotal, ...serviceValidateErrors, ...allocationErrors];
    return errorsTotal;
  }, [denormalizedData, submited, validateResult, allocationErrors]);
  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
