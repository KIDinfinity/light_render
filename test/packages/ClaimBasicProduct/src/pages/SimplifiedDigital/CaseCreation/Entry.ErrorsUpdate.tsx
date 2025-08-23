import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const { processData } = useSelector((state: any) => ({
    processData: state.simplifiedDigitalController.processData,
  }));

  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(processData);

    return [...formErrors];
  }, [processData]);

  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
