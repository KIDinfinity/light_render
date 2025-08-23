import { denormalizeClaimData } from '@/utils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';
import { connect } from 'dva';
import lodash from 'lodash';
import React, { useMemo } from 'react';
import { collectSectionErrors, collectSectionRequireErrors } from './validators';

const EntryErrorsUpdate = ({
  claimEntities,
  claimProcessData,
  submited,
  allocationErrors,
  simpleDiseasePayableDaysError,
  setShowRequiredError,
}: any) => {
  // const { claimEntities, claimProcessData, submited, allocationErrors } = useSelector((state) => ({
  //   ...lodash.pick(state?.daOfClaimAssessmentController, ['claimEntities', 'claimProcessData']),
  //   submited: state.formCommonController.submited,
  //   allocationErrors: state.paymentAllocation.errors,
  // }));
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
  const errors = useMemo(() => {
    const errorsDetail = formUtils.getErrorArray(denormalizedData, true) || [];
    const fieldErrors = errorsDetail.map((item) => item.key);
    let requiredErrors = (formUtils.getErrorArray(denormalizedData, true) || []).filter(
      (item) => item.message === formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })
    );
    const sectionErrors = collectSectionErrors(claimData, submited, claimEntities);
    const sectionRequiredErrors = collectSectionRequireErrors(claimData, true, claimEntities);
    if (lodash.isArray(sectionRequiredErrors) && sectionRequiredErrors.length) {
      requiredErrors = [...requiredErrors, ...sectionRequiredErrors];
    }
    return {
      errorsTotal: [
        ...fieldErrors,
        ...sectionErrors,
        ...allocationErrors,
        ...(simpleDiseasePayableDaysError || []),
      ],
      requiredError: !lodash.isEmpty(requiredErrors),
    };
  }, [claimData, submited, claimEntities, allocationErrors, simpleDiseasePayableDaysError]);

  setShowRequiredError(errors.requiredError);

  bpm.updateErrors({ errors: errors.errorsTotal });
  return <></>;
};

export default connect(
  ({ daOfClaimAssessmentController, formCommonController, paymentAllocation }: any) => ({
    claimEntities: daOfClaimAssessmentController.claimEntities,
    claimProcessData: daOfClaimAssessmentController.claimProcessData,
    simpleDiseasePayableDaysError: daOfClaimAssessmentController.simpleDiseasePayableDaysError,
    submited: formCommonController.submited,
    allocationErrors: paymentAllocation.errors,
  })
)(EntryErrorsUpdate);
