import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default ({ clientId }) => {
  const processData = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.processData;
  }, shallowEqual);

  return useMemo(
    () => lodash.some(processData, (item) => item?.clientInfo?.clientId === clientId),
    [processData, clientId]
  );
};
