import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const addingLoadingItems = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.addingLoadingItems,
    shallowEqual
  );
  return addingLoadingItems;
};
