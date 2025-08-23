import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { collectSectionErrors } from './validators';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const EntryErrorsUpdate = ({ setShowRequiredError }) => {
  const { claimProcessData, claimEntities, submited } = useSelector((state: any) => ({
    claimProcessData: state.apOfClaimAssessmentController.claimProcessData,
    claimEntities: state.apOfClaimAssessmentController.claimEntities,
    submited: state.formCommonController.submited,
  }));
  const denormalizedData = useMemo(
    () => denormalizeClaimData(claimProcessData, claimEntities),
    [claimProcessData, claimEntities]
  );
  const errors = useMemo(() => {
    const errorsDetail = formUtils.getErrorArray(denormalizedData, true) || [];
    let errorsTotal = errorsDetail.map((item) => item.key);
    let requiredErrors = (formUtils.getErrorArray(denormalizedData, true) || []).filter(
      (item) => item.message === formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })
    );
    const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimProcessData));
    const entities = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimEntities));
    const sectionErrors = collectSectionErrors(content, submited, entities);
    if (lodash.isArray(sectionErrors) && sectionErrors.length) {
      errorsTotal = [...errorsTotal, ...sectionErrors];
      requiredErrors = [...requiredErrors, ...sectionErrors];
    }
    return { errorsTotal, requiredError: !lodash.isEmpty(requiredErrors) };
  }, [denormalizedData, submited]);

  setShowRequiredError(errors.requiredError);

  bpm.updateErrors({ errors: errors.errorsTotal });
  return <></>;
};

export default EntryErrorsUpdate;
