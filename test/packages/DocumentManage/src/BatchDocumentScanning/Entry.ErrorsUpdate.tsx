import React, { useMemo } from 'react';
import { formUtils } from 'basic/components/Form';
import { isEmpty } from 'lodash';
import { useSelector } from 'dva';
import bpm from 'bpm/pages/OWBEntrance';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import omit from 'lodash/omit';

const EntryErrorsUpdate = () => {
  const { type, claimProcessData } = useSelector(({ batchDocumentScanningController }) => ({
    claimProcessData: batchDocumentScanningController?.claimProcessData,
    type: batchDocumentScanningController?.type,
  }));
  const { submited } = useSelector((state: any) => state.formCommonController);
  const errors = useMemo(() => {
    const err = [];
    const typeErr = submited && isEmpty(type) ? [{ message: 'required' }] : [];
    const fileError = [];
    forEach(claimProcessData, (data) => {
      const uploadFiles = get(data, 'uploadFiles', []);
      const claimData = { data: omit(data, ['uploadFiles']), uploadFiles, submited };
      err.push(...formUtils.getErrorArray(claimData));
      if (isEmpty(uploadFiles) || uploadFiles.some((file) => isEmpty(file?.fileId))) {
        fileError.push({ message: 'required' });
      }
    });
    return [...err, ...typeErr, ...fileError];
  }, [claimProcessData, submited, type]);

  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
