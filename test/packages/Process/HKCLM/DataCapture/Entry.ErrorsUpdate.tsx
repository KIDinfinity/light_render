import React, { useMemo } from 'react';
import { NAMESPACE } from './activity.config';

import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { denormalizeClaimData } from './utils/normalizrUtils';
import { sectionErrors } from './validators';

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
    const collectSectionErrors = sectionErrors(claimData, submited, claimEntities);
    return [...formErrors, ...collectSectionErrors, ...menuCreateErrors];
  }, [claimProcessData, submited, menuCreateErrors, claimEntities]);

  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
