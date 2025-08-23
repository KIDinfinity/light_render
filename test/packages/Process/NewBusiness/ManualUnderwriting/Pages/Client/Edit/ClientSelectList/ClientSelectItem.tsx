import React, { useCallback} from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import configs from '../../_section';
import ClientSelectItem from '../../_component/ClientSelect';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();
  const handleSelect = useCallback(() => {
    dispatch({
      type: `login/saveLoadingStatus`,
      payload: { loadingStatus: true },
    });

    setTimeout(async () => {
      const errors = await dispatch({
        type: `${NAMESPACE}/validateForms`,
        payload: { formKeys: [...configs] },
      });

      if (lodash.size(errors) === 0) {
        dispatch({
          type: `${NAMESPACE}/setEditingClientId`,
          payload: { clientId },
        });
      }
      dispatch({
        type: `login/saveLoadingStatus`,
        payload: { loadingStatus: false },
      });
    });
  }, []);

  return <ClientSelectItem clientId={clientId} handleSelect={handleSelect} readOnly={false} />;
};
