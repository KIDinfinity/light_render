import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetBatchSendEnvoyOptions from 'bpm/pages/Envoy/hooks/useGetBatchSendEnvoyOptions';

export default () => {
  const options = useGetBatchSendEnvoyOptions();
  const batchEnvoySelected = useSelector(
    (state: any) => state.envoyController.batchEnvoySelected,
    shallowEqual
  );
  return useMemo(() => {
    return lodash.isEmpty(options) || lodash.isEmpty(batchEnvoySelected);
  }, [options, batchEnvoySelected]);
};
