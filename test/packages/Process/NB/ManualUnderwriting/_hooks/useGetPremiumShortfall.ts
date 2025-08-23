import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default () => {
  const paymentListData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.paymentListData,
    shallowEqual
  );
  const premiumShortfall = useMemo(() => {
    return lodash.chain(paymentListData).get('policyInitialPremium', '').toNumber().value();
  }, [paymentListData]);
  return premiumShortfall.toFixed(2);
};
