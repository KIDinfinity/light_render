import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  return useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.cfgRegionalDefaultValueList,
    shallowEqual
  );
};
