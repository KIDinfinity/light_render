import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { collectSectionErrors } from 'claimBasicProduct/pages/validators';
import { denormalizeClaimData } from '@/utils/claimUtils';
import bpm from 'bpm/pages/OWBEntrance';

const ErrorUpdate = () => {
  const { claimProcessData, claimEntities, submited } = useSelector((state: any) => ({
    claimProcessData: state.apOfClaimCaseController.claimProcessData,
    claimEntities: state.apOfClaimCaseController.claimEntities,
    submited: state.formCommonController.submited,
  }));
  const denormalizedData = useMemo(() => denormalizeClaimData(claimProcessData, claimEntities), [
    claimProcessData,
    claimEntities,
  ]);
  const errors = useMemo(() => {
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    let errorsTotal = formUtils.getErrorArray(denormalizedData);
    const sectionErrors = collectSectionErrors(claimData, submited, claimEntities);
    if (lodash.isArray(sectionErrors) && sectionErrors.length) {
      errorsTotal = [...errorsTotal, ...sectionErrors];
    }
    return errorsTotal;
  }, [denormalizedData, submited]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default ErrorUpdate;
