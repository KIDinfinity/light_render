import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const numberofunitsList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.numberofunitsList,
    shallowEqual
  );
  return numberofunitsList;
};
