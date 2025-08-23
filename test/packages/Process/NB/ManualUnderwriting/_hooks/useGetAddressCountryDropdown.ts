import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const country = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.address.country,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(country)
      .map((el: any) => ({
        ...el,
        dictCode: el.subCode,
        dictName: el.subName,
      }))
      .value();
  }, [country]);
};
