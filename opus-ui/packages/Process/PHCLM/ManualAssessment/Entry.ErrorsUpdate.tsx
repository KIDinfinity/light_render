import React, { useMemo } from 'react';
import { NAMESPACE } from './activity.config';

import { useSelector } from 'dva';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { sectionErrors } from './validators';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  const treatmentPayableAddItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.treatmentPayableAddItem
  );
  const invoicePayableAddItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.invoicePayableAddItem
  );
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const menuCreateErrors = useSelector(
    ({ menuCreateCaseClaim }: any) => menuCreateCaseClaim.errors
  );
  const allocationErrors = useSelector(({ paymentAllocation }: any) => paymentAllocation.errors);
  const forms = useSelector(({ formCommonController }: any) => formCommonController.forms);

  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);

  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const collectSectionErrors = sectionErrors(claimData, submited, claimEntities);
    const treatmentPayableAddItemErrors = formUtils.getErrorArray(treatmentPayableAddItem);
    const invoicePayableAddItemErrors = formUtils.getErrorArray(invoicePayableAddItem);
    return [
      ...formErrors,
      ...collectSectionErrors,
      ...menuCreateErrors,
      ...allocationErrors,
      ...treatmentPayableAddItemErrors,
      ...invoicePayableAddItemErrors,
    ];
  }, [
    claimProcessData,
    submited,
    menuCreateErrors,
    claimEntities,
    allocationErrors,
    treatmentPayableAddItem,
    invoicePayableAddItem,
  ]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
