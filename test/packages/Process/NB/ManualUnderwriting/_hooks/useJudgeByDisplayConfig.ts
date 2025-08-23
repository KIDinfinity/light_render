import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetClientDetailList from './useGetClientDetailList';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ id, config, targetKey, valueKey }: any) => {
  const idDisplayConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.idDisplayConfigList,
    shallowEqual
  );
  const clientDetailList = useGetClientDetailList();
  const current = lodash.find(clientDetailList, (i: any) => i.id === id);
  const value = lodash.get(current, valueKey);

  const isVisible = lodash.isEmpty(idDisplayConfigList)
    ? true
    : lodash
        .chain(idDisplayConfigList)
        .some((item: any) => item?.idType === value && item?.[targetKey] === 'Y')
        .value();

  return useMemo(() => {
    return lodash
      .chain(config)
      .filter((item: any) => {
        if (targetKey == item?.field) {
          return isVisible;
        }
        return true;
      })
      .value();
  }, [config, isVisible, targetKey]);
};
