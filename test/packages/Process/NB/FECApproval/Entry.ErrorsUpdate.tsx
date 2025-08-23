import React, { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';
import { NAMESPACE } from './activity.config';

const EntryErrorsUpdate = () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );

  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(businessData);
    return [...formErrors];
  }, [businessData]);
  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
