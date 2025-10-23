import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { collectSectionErrors } from 'claimBasicProduct/pages/validators';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

export default () => {
  const claimProcessData = useSelector(
    (state: any) => state.bpOfClaimAssessmentController.claimProcessData
  );
  const claimEntities = useSelector(
    (state: any) => state.bpOfClaimAssessmentController.claimEntities
  );
  const submited = useSelector((state: any) => state.formCommonController.submited);
  const menuCreateErrors = useSelector((state: any) => state.menuCreateCaseClaim.errors);
  const allocationErrors = useSelector((state: any) => state.paymentAllocation.errors);

  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const sectionErrors = collectSectionErrors(claimData, submited);
    return [...formErrors, ...sectionErrors, ...menuCreateErrors, ...allocationErrors];
  }, [claimProcessData, submited, menuCreateErrors, claimEntities, allocationErrors]);

  bpm.updateErrors({ errors });

  return <></>;
};
