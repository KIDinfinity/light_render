import { useEffect } from 'react';
import { useDispatch } from 'dva';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

export default () => {
  const dispatch = useDispatch();
  const NAMESPACE = useGetNamespace();
  useEffect(() => {
    return () => {
      dispatch({
        type: `${NAMESPACE}/setChequeInfoList`,
        payload: {
          chequeInfoList: [],
        },
      });
    };
  }, []);
};
