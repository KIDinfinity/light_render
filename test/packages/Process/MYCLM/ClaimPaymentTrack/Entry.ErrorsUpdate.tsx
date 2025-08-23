import React, { useMemo } from 'react';
import { NAMESPACE } from './activity.config';

import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );

  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(claimProcessData);

    return [...formErrors];
  }, [claimProcessData]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
