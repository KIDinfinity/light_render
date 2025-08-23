import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { collectSectionErrors } from 'claimBasicProduct/pages/validators';
import { formUtils, Validator } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const {
    claimProcessData,
    claimEntities,
    submited,
    menuCreateErrors,
    allocationErrors,
    treatmentPayableAddItem,
    invoicePayableAddItem,
    draftState,
    claimPayableGroupList,
  } = useSelector((state: any) => ({
    claimProcessData: state.JPCLMOfClaimAssessment.claimProcessData,
    claimEntities: state.JPCLMOfClaimAssessment.claimEntities,
    draftState: state.JPCLMOfClaimAssessment,
    claimPayableGroupList: state.JPCLMOfClaimAssessment.claimPayableGroupList,
    treatmentPayableAddItem: state.JPCLMOfClaimAssessment.treatmentPayableAddItem,
    invoicePayableAddItem: state.JPCLMOfClaimAssessment.invoicePayableAddItem,
    submited: state.formCommonController.submited,
    menuCreateErrors: state.menuCreateCaseClaim.errors,
    allocationErrors: state.paymentAllocation.errors,
    forms: state.formCommonController.forms,
  }));
  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);

  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const sectionErrors = collectSectionErrors(claimData, submited);
    const treatmentPayableAddItemErrors = formUtils.getErrorArray(treatmentPayableAddItem);
    const invoicePayableAddItemErrors = formUtils.getErrorArray(invoicePayableAddItem);
    const claimPayableGroupListErrors = formUtils.getErrorArray(claimPayableGroupList);
    const radioTherapyReasonDateGroupErrors = Validator.VLD_000698(draftState);

    return [
      ...formErrors,
      ...sectionErrors,
      ...menuCreateErrors,
      ...allocationErrors,
      ...treatmentPayableAddItemErrors,
      ...invoicePayableAddItemErrors,
      ...radioTherapyReasonDateGroupErrors,
      ...claimPayableGroupListErrors,
    ];
  }, [
    claimProcessData,
    submited,
    menuCreateErrors,
    claimEntities,
    allocationErrors,
    treatmentPayableAddItem,
    invoicePayableAddItem,
    draftState,
  ]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
