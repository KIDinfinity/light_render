import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';

export default () => {
  const taskDetail = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.taskDetail,
    shallowEqual
  );

  return useMemo(() => {
    return lodash.get(taskDetail, 'rejected', false);
  }, [taskDetail]);
};
