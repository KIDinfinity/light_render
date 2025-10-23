import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { collectSectionErrors } from './validators';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';

const EntryErrorsUpdate = () => {
  const {
    claimProcessData,
    claimEntities,
    submited,
    menuCreateErrors,
    allocationErrors,
  } = useSelector((state: any) => ({
    claimProcessData: state.PHCLMOfClaimAssessmentController.claimProcessData,
    claimEntities: state.PHCLMOfClaimAssessmentController.claimEntities,
    submited: state.formCommonController.submited,
    menuCreateErrors: state.menuCreateCaseClaim.errors,
    allocationErrors: state.paymentAllocation.errors,
  }));
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const sectionErrors = collectSectionErrors(claimData, submited, claimEntities);

    return [...formErrors, ...sectionErrors, ...menuCreateErrors, ...allocationErrors];
  }, [claimProcessData, submited, menuCreateErrors, claimEntities, allocationErrors]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
