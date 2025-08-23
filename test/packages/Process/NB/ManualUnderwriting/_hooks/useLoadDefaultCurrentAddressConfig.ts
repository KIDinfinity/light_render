import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/loadDefaultCurrentAddressConfig`,
    });
    return () => {
      dispatch({
        type: `${NAMESPACE}/setDefaultCurrentAddressTypeConfig`,
        payload: {
          defaultCurrentAddressType: '',
        },
      });
    };
  }, []);
};
