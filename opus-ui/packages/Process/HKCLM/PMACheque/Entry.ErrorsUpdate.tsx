import React, { useMemo } from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';

const EntryErrorsUpdate = () => {
  const chequeCase = useSelector(
    ({ HKCLMOfPMAChequeController }: any) =>
      HKCLMOfPMAChequeController.businessData?.chequeCase || {}
  );
  const errors = useMemo(() => {
    return formUtils.getErrorArray(chequeCase);
  }, [chequeCase]);

  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
