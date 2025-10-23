import React, { useMemo } from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import { getSectionError } from 'phowb/utils/validate';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';

const EntryErrorsUpdate = () => {
  const data = useSelector((state: any) => ({
    policyInfo: state?.PHBatchCreateProcessController?.processData?.policyInfo,
    transactionTypes: state?.PHBatchCreateProcessController?.processData?.transactionTypes,
  }));
  const errors = useMemo(() => {
    const sectionErrors = getSectionError(data);
    const fieldsError = formUtils.getErrorArray(data);
    const totalErrors = [...sectionErrors, ...fieldsError];
    return totalErrors;
  }, [data]);

  bpm.updateErrors({
    errors,
  });
  return <></>;
};
export default EntryErrorsUpdate;
