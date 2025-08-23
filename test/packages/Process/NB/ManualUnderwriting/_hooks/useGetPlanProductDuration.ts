import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const planProductDuration = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.planProductDuration,
    shallowEqual
  );

  return planProductDuration;
};
