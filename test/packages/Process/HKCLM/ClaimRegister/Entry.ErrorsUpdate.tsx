import React, { useMemo } from 'react';
import { NAMESPACE } from './activity.config';
import { denormalizeClaimData } from '../DataCapture/utils/normalizrUtils';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const menuCreateErrors = useSelector(
    ({ menuCreateCaseClaim }: any) => menuCreateCaseClaim.errors
  );
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);

  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(denormalizedData);
    return [...formErrors, ...menuCreateErrors];
  }, [claimProcessData, menuCreateErrors]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
