import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const newSiRequired = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.newSiRequired,
    shallowEqual
  );
  return newSiRequired;
};
