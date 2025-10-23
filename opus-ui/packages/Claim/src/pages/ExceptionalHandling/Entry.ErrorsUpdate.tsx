import React, { useMemo } from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';

const EntryErrorsUpdate = () => {
  const integrationExceptionHandlingDataList = useSelector(
    (state: any) =>
      state.exceptionalHandlingController?.claimProcessData?.integrationExceptionHandlingDataList
  );
  const errorInfoList = integrationExceptionHandlingDataList?.reduce((res, cur) => {
    res.push(...cur?.errorInfoList);
    return res;
  }, []);

  const errors = useMemo(() => formUtils.getErrorArray(errorInfoList), [errorInfoList]);
  bpm.setClaimDataSelector((state: any) => state.exceptionalHandlingController);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
