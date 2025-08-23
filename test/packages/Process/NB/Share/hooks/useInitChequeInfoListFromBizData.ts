import { useEffect } from 'react';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

export default ({ businessData }: any) => {
  const dispatch = useDispatch();
  const NAMESPACE = useGetNamespace();
  useEffect(() => {
    const chequeInfoList = lodash
      .chain(businessData)
      .get('policyList[0].chequeInfoList', [])
      .value();
    if (!lodash.isEmpty(chequeInfoList) && NAMESPACE) {
      dispatch({
        type: `${NAMESPACE}/setChequeInfoList`,
        payload: {
          chequeInfoList,
        },
      });
    }
  }, [businessData, NAMESPACE]);
};
