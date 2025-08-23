import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const agentList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.agentList,
    shallowEqual
  );
  return useMemo(() => {
    return lodash.find(agentList, (item: any) => item?.id === id);
  }, [agentList, id]);
};
