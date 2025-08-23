import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/EWS/activity.config';
import lodash from 'lodash';

export default ({ version }: any) => {
  const selectedEwsVersion = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.selectedEwsVersion,
    shallowEqual
  );
  return useMemo(() => {
    return lodash.isEqual(version, selectedEwsVersion);
  }, [selectedEwsVersion, version]);
};
