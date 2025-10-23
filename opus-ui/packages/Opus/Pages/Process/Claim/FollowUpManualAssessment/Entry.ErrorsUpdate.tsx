import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
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
    claimProcessData: state?.[NAMESPACE].claimProcessData,
    claimEntities: state?.[NAMESPACE].claimEntities,
    draftState: state?.[NAMESPACE],
    claimPayableGroupList: state?.[NAMESPACE].claimPayableGroupList,
    treatmentPayableAddItem: state?.[NAMESPACE].treatmentPayableAddItem,
    invoicePayableAddItem: state?.[NAMESPACE].invoicePayableAddItem,
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
