import React, { useMemo } from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';

const EntryErrorsUpdate = () => {
  const claimProcessData = useSelector((state: any) => state.dataConfigurationController.formData);
  const errors = useMemo(() => {
    return formUtils.getErrorArray(claimProcessData);
  }, [claimProcessData]);
  bpm.setClaimDataSelector((state: any) => state.dataConfigurationController);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
