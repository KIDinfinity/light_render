import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ value, targetKey }: any) => {
  const idDisplayConfigList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.idDisplayConfigList,
    shallowEqual
  );

  if (lodash.isEmpty(idDisplayConfigList)) {
    return true;
  }
  return lodash
    .chain(idDisplayConfigList)
    .some((item: any) => item?.idType === value && item?.[targetKey] === 'Y')
    .value();
};
