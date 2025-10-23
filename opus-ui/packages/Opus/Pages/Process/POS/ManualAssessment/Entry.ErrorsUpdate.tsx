import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';
import { NAMESPACE } from './activity.config';

const EntryErrorsUpdate = () => {
  const { processData, entities } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => ({
      processData: modelnamepsace.processData,
      entities: modelnamepsace.entities,
    }),
    shallowEqual
  );

  const errors = useMemo(() => {
    const formErrors = [];
    formErrors.push(...formUtils.getErrorArray(processData));
    formErrors.push(...formUtils.getErrorArray(entities));
    return formErrors;
  }, [processData, entities]);
  bpm.updateErrors({ errors });

  return <></>;
};

export default EntryErrorsUpdate;
