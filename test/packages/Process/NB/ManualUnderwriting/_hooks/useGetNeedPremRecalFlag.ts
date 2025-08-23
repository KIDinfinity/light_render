import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const needPremRecal = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.needPremRecal,
    shallowEqual
  );
  return needPremRecal;
};
