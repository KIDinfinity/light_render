import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

export default () => {
  const NAMESPACE = useGetNamespace();
  const paymentOption = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, 'businessData.policyList[0].paymentOption'),
    shallowEqual
  );

  return useMemo(() => paymentOption, [paymentOption]);
};
