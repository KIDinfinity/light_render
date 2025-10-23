import React from 'react';
import { useDispatch } from 'dva';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import ClientSelectItem from '../../_component/ClientSelect';

export default ({ clientId, editMode }: any) => {
  const dispatch = useDispatch();
  const handleSelect = () => {
    dispatch({
      type: `${NAMESPACE}/selectClient`,
      payload: { clientId },
    });
  };

  return <ClientSelectItem clientId={clientId} handleSelect={handleSelect} editMode={editMode} />;
};
