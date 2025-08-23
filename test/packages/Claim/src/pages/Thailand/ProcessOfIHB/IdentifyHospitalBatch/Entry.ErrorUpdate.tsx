import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import { formUtils } from 'basic/components/Form';
import { denormalizeClaimData } from '@/utils/claimUtils';

const EntryUpdate = () => {
  const { claimProcessData, submited } = useSelector((state: any) => ({
    claimProcessData: state.IdentifyHospitalBatchController.claimProcessData,
    submited: state.formCommonController.submited,
  }));

  const denormalizedData = useMemo(() => denormalizeClaimData(claimProcessData), [
    claimProcessData,
  ]);
  const errors = useMemo(() => {
    const errorsTotal = formUtils.getErrorArray(denormalizedData);
    return errorsTotal;
  }, [denormalizedData, submited]);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryUpdate;
