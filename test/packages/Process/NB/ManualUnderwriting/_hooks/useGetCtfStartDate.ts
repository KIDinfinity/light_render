import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ identityType }: any) => {
  const idDisplayConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.idDisplayConfigList,
    shallowEqual
  );
  return useMemo(() => {
    if (lodash.isEmpty(idDisplayConfigList)) {
      return true;
    }
    return lodash
      .chain(idDisplayConfigList)
      .some((item: any) => item?.idType === identityType && item?.issueDate === 'Y')
      .value();
  }, [idDisplayConfigList, identityType]);
};
