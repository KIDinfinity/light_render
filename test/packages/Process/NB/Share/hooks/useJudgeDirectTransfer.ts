import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import PayType from 'process/NB/Enum/PayType';

export default () => {
  const NAMESPACE = useGetNamespace();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  return useMemo(() => {
    const paymentType = lodash.get(businessData, 'policyList[0].paymentList[0].payType');
    if (paymentType === PayType.DirectTransfer) {
      return true;
    }
    return false;
  }, [businessData]);
};
