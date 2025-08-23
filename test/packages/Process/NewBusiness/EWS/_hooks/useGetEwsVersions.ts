import lodash from 'lodash';
import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/EWS/activity.config';

export default () => {
  const ewsVersions = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ewsVersions,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(ewsVersions)
      .map((item) => {
        return lodash.pick(item, ['version', 'submitDate', 'id']);
      })
      .value();
  }, [ewsVersions]);
};
