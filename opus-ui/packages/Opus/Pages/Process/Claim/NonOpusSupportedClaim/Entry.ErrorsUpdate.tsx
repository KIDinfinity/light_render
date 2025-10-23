import React from 'react';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import { formUtils } from 'basic/components/Form';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const { businessData } = useSelector((state: any) => state?.[NAMESPACE].businessData);

  const errors = formUtils.getErrorArray(businessData);
  bpm.updateErrors({ errors });
  return <></>;
};

export default EntryErrorsUpdate;
