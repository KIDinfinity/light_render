import React, { useMemo } from 'react';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';
import { connect } from 'dva';
import { collectSectionErrors } from './validators';

const EntryErrorsUpdate = ({ claimEntities, claimProcessData, submited }: any) => {
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const errors = useMemo(() => {
    const fieldErrors = formUtils.getErrorArray(denormalizedData);
    const sectionErrors = collectSectionErrors(claimData, submited, claimEntities);
    return [...fieldErrors, ...sectionErrors];
  }, [claimData, submited, claimEntities]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default connect(({ daOfClaimCaseController, formCommonController }: any) => ({
  claimEntities: daOfClaimCaseController.claimEntities,
  claimProcessData: daOfClaimCaseController.claimProcessData,
  submited: formCommonController.submited,
}))(EntryErrorsUpdate);
