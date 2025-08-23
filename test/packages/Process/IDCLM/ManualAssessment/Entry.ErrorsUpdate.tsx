import React, { useMemo } from 'react';
import { NAMESPACE } from './activity.config';

import { useSelector } from 'dva';
import { denormalizeClaimData } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

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

    return [
      ...formErrors,
    ];
  }, [
    claimProcessData,
    submited,
    claimEntities,
  ]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
