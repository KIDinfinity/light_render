import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import useGetChequeInfoList from 'process/NB/Share/hooks/useGetChequeInfoList';

export default () => {
  const NAMESPACE = useGetNamespace();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.businessData,
    shallowEqual
  );
  const chequeInfoList = useGetChequeInfoList();
  return useMemo(() => {
    const policyId = lodash.get(businessData, 'policyList[0].policyId');

    const result = lodash
      .chain(chequeInfoList)
      .find((item: any) => item.policyId === policyId)
      .value();

    return result;
  }, [businessData, chequeInfoList]);
};
