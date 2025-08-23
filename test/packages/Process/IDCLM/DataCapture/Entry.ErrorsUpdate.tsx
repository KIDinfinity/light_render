import React, { useMemo } from 'react';
import { NAMESPACE } from './activity.config';

import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { denormalizeClaimData } from './utils/normalizrUtils';

const EntryErrorsUpdate = () => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  const submited = useSelector(({ formCommonController }: any) => formCommonController.submited);

  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);

  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    return [...formErrors];
  }, [claimProcessData, submited, claimEntities]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
