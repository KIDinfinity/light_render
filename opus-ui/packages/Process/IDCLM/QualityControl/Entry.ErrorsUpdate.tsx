import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorUpdate = () => {
  const { claimProcessData, claimEntities, submited } = useSelector(
    (state: any) => ({
      claimProcessData: state.IDCLMOfClaimAssessmentController.claimProcessData,
      claimEntities: state.IDCLMOfClaimAssessmentController.claimEntities,
      submited: state.formCommonController.submited,
    })
  );
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    return [...formErrors];
  }, [claimProcessData, submited, claimEntities]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorUpdate;
