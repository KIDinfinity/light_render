import React, { useMemo } from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import sectionError from './validators/sectionError';

const EntryErrorsUpdate = ({ taskDetail }) => {
  const claimProcessData = useSelector(
    (state: any) => state.GeneralPOSPHNotCFTController.claimProcessData
  );

  const errors = useMemo(() => {
    return [
      ...formUtils.getErrorArray(claimProcessData),
      ...sectionError({ claimProcessData, taskDefKey: taskDetail?.taskDefKey }),
    ];
  }, [claimProcessData]);

  bpm.setClaimDataSelector((state: any) => state.GeneralPOSPHNotCFTController.claimProcessData);
  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
