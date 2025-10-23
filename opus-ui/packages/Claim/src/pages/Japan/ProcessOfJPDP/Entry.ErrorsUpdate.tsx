import React, { useMemo } from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';

const EntryErrorsUpdate = () => {
  const { businessData: pageOfBusinessData } = useSelector((state: any) => ({
    businessData: state.JPDPOfDocumentDispatchController.businessData,
    submited: state.JPDPOfDocumentDispatchController.submited,
  }));
  const errors = useMemo(() => formUtils.getErrorArray(pageOfBusinessData), [pageOfBusinessData]);
  bpm.updateErrors({ errors });
  return <></>;
};
export default EntryErrorsUpdate;
