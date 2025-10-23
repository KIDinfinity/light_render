import React, { useMemo } from 'react';
import { NAMESPACE } from './activity.config';
import { denormalizeClaimData } from './utils/normalizrUtils';
import { collectSectionErrors } from 'claimBasicProduct/pages/validators';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);
  const menuCreateErrors = useSelector(
    ({ menuCreateCaseClaim }: any) => menuCreateCaseClaim.errors
  );


  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);

  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    const claimData = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const sectionErrors = collectSectionErrors(claimData, submited);
    return [...formErrors, ...sectionErrors, ...menuCreateErrors];
  }, [claimProcessData, menuCreateErrors, claimEntities]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
