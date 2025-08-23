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
  const ewsDataMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ewsDataMap,
    shallowEqual
  );

  const currentVersionEWS = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.currentVersionEWS,
    shallowEqual
  );

  return useMemo(() => {
    return currentVersionEWS || lodash.get(ewsDataMap, selectedEwsVersion);
  }, [selectedEwsVersion, ewsDataMap, currentVersionEWS]);
};
