import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  return useMemo(() => {
    const bankCardInfo = lodash.get(businessData, 'policyList[0].bankCardInfoList[0]', {});
    const bankInfo = lodash.get(businessData, 'policyList[0].bankInfoList[0]', {});
    return lodash.assign(bankCardInfo, bankInfo);
  }, [businessData]);
};
