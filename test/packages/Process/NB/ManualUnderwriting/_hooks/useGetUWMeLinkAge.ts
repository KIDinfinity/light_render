import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default () => {
  const UWMeLinkAge = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.UWMeLinkAge,
    shallowEqual
  );
  return useMemo(() => {
    if (!lodash.isEmpty(UWMeLinkAge)) {
      return UWMeLinkAge;
    }
  }, [UWMeLinkAge]);
};
