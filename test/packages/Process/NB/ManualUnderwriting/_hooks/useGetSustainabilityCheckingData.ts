import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const sustainabilityCheckingData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.sustainabilityCheckingData,
    shallowEqual
  );
  return sustainabilityCheckingData;
};
