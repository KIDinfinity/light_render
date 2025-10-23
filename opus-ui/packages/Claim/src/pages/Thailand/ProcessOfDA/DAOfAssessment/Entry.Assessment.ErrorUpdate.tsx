import React, { useMemo } from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { collectSectionErrors } from './validators';

const EntryErrorsUpdate = ({
  claimEntities,
  claimProcessData,
  submited,
  allocationErrors,
}: any) => {
  // const { claimEntities, claimProcessData, submited, allocationErrors } = useSelector((state) => ({
  //   ...lodash.pick(state?.daOfClaimAssessmentController, ['claimEntities', 'claimProcessData']),
  //   submited: state.formCommonController.submited,
  //   allocationErrors: state.paymentAllocation.errors,
  // }));
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const errors = useMemo(() => {
    const fieldErrors = formUtils.getErrorArray(denormalizedData);
    const sectionErrors = collectSectionErrors(claimData, submited, claimEntities);
    return [...fieldErrors, ...sectionErrors, ...allocationErrors];
  }, [claimData, submited, claimEntities, allocationErrors]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default connect(
  ({ daOfClaimAssessmentController, formCommonController, paymentAllocation }: any) => ({
    claimEntities: daOfClaimAssessmentController.claimEntities,
    claimProcessData: daOfClaimAssessmentController.claimProcessData,
    submited: formCommonController.submited,
    allocationErrors: paymentAllocation.errors,
  })
)(EntryErrorsUpdate);
