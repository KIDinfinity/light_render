import React, { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import { isEmpty } from 'lodash';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const claimProcessData = useSelector(
    (state: any) => state.documentScanningController?.claimProcessData
  );
  const { submited } = useSelector((state: any) => state.formCommonController);
  const uploadFiles = useSelector((state: any) => state.documentManagement?.uploadFiles);
  const errors = useMemo(() => {
    const data = { claimProcessData, uploadFiles, submited };
    const err = formUtils.getErrorArray(data);
    const typeErr = submited && isEmpty(claimProcessData?.type) ? [{ message: 'required' }] : [];
    const fileError = isEmpty(uploadFiles) ? [{ message: 'required' }] : [];
    return [...err, ...typeErr, ...fileError];
  }, [claimProcessData, uploadFiles, submited]);

  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
