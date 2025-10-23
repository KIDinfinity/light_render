import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { collectSectionErrors } from './validators';

const EntryErrorsUpdate = () => {
  const { claimProcessData, claimEntities, submited } = useSelector((state: any) => ({
    claimProcessData: state.apOfClaimAssessmentController.claimProcessData,
    claimEntities: state.apOfClaimAssessmentController.claimEntities,
    submited: state.formCommonController.submited,
  }));
  const denormalizedData = useMemo(() => denormalizeClaimData(claimProcessData, claimEntities), [
    claimProcessData,
    claimEntities,
  ]);
  const errors = useMemo(() => {
    let errorsTotal = formUtils.getErrorArray(denormalizedData);
    const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimProcessData));
    const entities = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimEntities));
    const sectionErrors = collectSectionErrors(content, submited, entities);
    if (lodash.isArray(sectionErrors) && sectionErrors.length) {
      errorsTotal = [...errorsTotal, ...sectionErrors];
    }
    return errorsTotal;
  }, [denormalizedData, submited]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
