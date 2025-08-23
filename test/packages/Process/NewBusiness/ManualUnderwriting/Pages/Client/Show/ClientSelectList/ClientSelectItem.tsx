import React from 'react';
import { useDispatch } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import ClientSelectItem from '../../_component/ClientSelect';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const handleSelect = () => {
    dispatch({
      type: `${NAMESPACE}/selectClient`,
      payload: { clientId },
    });
  };

  return <ClientSelectItem clientId={clientId} handleSelect={handleSelect} />;
};
