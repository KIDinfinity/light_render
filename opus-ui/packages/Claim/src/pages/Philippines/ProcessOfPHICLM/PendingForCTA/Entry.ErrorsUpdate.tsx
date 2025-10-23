import React, { useMemo } from 'react';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { useSelector } from 'dva';
import { collectSectionErrors } from 'claimBasicProduct/pages/validators';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const { claimProcessData, claimEntities, submited, menuCreateErrors } = useSelector(
    (state: any) => ({
      claimProcessData: state.PHCLMOfClaimAssessmentController.claimProcessData,
      claimEntities: state.PHCLMOfClaimAssessmentController.claimEntities,
      submited: state.formCommonController.submited,
      menuCreateErrors: state.menuCreateCaseClaim.errors,
    })
  );
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const sectionErrors = collectSectionErrors(claimData, submited);
    return [...formErrors, ...sectionErrors, ...menuCreateErrors];
  }, [claimProcessData, submited, menuCreateErrors, claimEntities]);
  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
