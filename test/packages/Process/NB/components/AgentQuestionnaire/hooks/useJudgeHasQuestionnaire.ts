import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default () => {
  const processData = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.processData;
  }, shallowEqual);
  return useMemo(() => !lodash.isEmpty(processData), [processData]);
};
