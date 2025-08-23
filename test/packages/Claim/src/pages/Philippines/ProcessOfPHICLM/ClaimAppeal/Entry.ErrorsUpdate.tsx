import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { collectSectionErrors } from 'claimBasicProduct/pages/validators';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';

const EntryErrorsUpdate = () => {
  const {
    claimProcessData,
    claimEntities,
    submited,
    menuCreateErrors,
    claimAppealInfo,
    selectedCase,
  } = useSelector((state: any) => ({
    claimProcessData: state.PHCLMOfAppealCaseController.claimProcessData,
    claimEntities: state.PHCLMOfAppealCaseController.claimEntities,
    claimAppealInfo: state.MaAppealCaseController.claimAppealInfo,
    selectedCase: state.MaAppealCaseController.selectedCase,
    submited: state.formCommonController.submited,
    menuCreateErrors: state.menuCreateCaseClaim.errors,
  }));
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    const appealformErrors = formUtils.getErrorArray(claimAppealInfo);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const sectionErrors = collectSectionErrors(claimData, submited);
    const selectedCaseErrors = formUtils.getErrorArray(selectedCase);

    return [
      ...formErrors,
      ...sectionErrors,
      ...menuCreateErrors,
      ...appealformErrors,
      ...selectedCaseErrors,
    ];
  }, [claimProcessData, submited, menuCreateErrors, claimEntities, claimAppealInfo, selectedCase]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
