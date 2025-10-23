import React, { useMemo } from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';

const EntryErrorsUpdate = () => {
  const { claimProcessData } = useSelector((state: any) => ({
    claimProcessData: state.configureUserGroupController?.claimProcessData,
  }));
  const errors = useMemo(() => formUtils.getErrorArray(claimProcessData), [claimProcessData]);
  bpm.setClaimDataSelector((state: any) => state.configureUserGroupController?.claimProcessData);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
