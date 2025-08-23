import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/EWS/activity.config';

export default () => {
  const selectedEwsVersion = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.selectedEwsVersion,
    shallowEqual
  );
  const ewsOriginDataMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ewsOriginDataMap,
    shallowEqual
  );

  return useMemo(() => {
    return lodash.get(ewsOriginDataMap, selectedEwsVersion);
  }, [selectedEwsVersion, ewsOriginDataMap]);
};
