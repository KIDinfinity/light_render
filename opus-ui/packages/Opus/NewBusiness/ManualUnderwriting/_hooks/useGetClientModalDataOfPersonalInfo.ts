import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from '../activity.config';

export default () => {
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.modalData?.entities?.clientMap,
    shallowEqual
  );

  return useMemo(() => {
    return lodash
      .chain(clientMap)
      .map((client: any) => client?.personalInfo)
      .value();
  }, [clientMap]);
};
