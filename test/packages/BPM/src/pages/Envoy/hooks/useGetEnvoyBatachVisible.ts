import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

export default () => {
  const envoyBatchSendConfigs = useSelector(
    (state: any) => state.envoyController.envoyBatchSendConfigs,
    shallowEqual
  );
  return useMemo(() => {
    return !lodash.isEmpty(envoyBatchSendConfigs);
  }, [envoyBatchSendConfigs]);
};
