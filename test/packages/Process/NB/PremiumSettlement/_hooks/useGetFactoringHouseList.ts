import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';

export default () => {
  const factoringHouseList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.factoringHouseList,
    shallowEqual
  );
  return factoringHouseList;
};
