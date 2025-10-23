import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { collectSectionErrors } from 'claimBasicProduct/pages/validators';
import { denormalizeClaimData } from '@/utils/claimUtils';

const ErrorsUpdate = () => {
  const { claimProcessData, claimEntities, submited } = useSelector((state: any) => ({
    claimProcessData: state.hbOfClaimAssessmentController.claimProcessData,
    claimEntities: state.hbOfClaimAssessmentController.claimEntities,
    submited: state.formCommonController.submited,
  }));
  const denormalizedData = useMemo(() => denormalizeClaimData(claimProcessData, claimEntities), [
    claimProcessData,
    claimEntities,
  ]);
  const errors = useMemo(() => {
    let errorsTotal = formUtils.getErrorArray(denormalizedData);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const sectionErrors = collectSectionErrors(claimData, submited);
    if (lodash.isArray(sectionErrors) && sectionErrors.length > 0) {
      errorsTotal = [...errorsTotal, ...sectionErrors];
    }
    return errorsTotal;
  }, [denormalizedData, submited]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default ErrorsUpdate;
