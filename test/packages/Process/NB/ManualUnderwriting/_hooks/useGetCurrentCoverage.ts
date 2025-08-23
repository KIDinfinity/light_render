import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ id }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  return useMemo(() => {
    return lodash
      .chain(businessData)
      .get('policyList[0].coverageList')
      .find((item: any) => item?.id === id)
      .value();
  }, [businessData]);
};
