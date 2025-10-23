import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import ClientDetailRight from './ClientDetailRight';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getListDedupCheckCfg`,
    });
    dispatch({
      type: `${NAMESPACE}/getRegionalDefaultValue`,
      payload: {
        codeType: 'SPECIAL_MANDATORY_FIELD_ROLE',
      },
    });
  }, []);

  return <ClientDetailRight clientId={clientId} />;
};
