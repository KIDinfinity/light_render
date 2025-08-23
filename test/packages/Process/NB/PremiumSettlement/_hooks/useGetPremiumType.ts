import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/PremiumSettlement/activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    return lodash.get(businessData, 'premiumType', '');
  }, [businessData]);
};
