import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ policyNo }: any) => {
  const productCodeConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.productCodeConfig,
    shallowEqual
  );

  return useMemo(() => {
    return lodash.get(productCodeConfig, `${policyNo}`);
  }, [productCodeConfig, policyNo]);
};
