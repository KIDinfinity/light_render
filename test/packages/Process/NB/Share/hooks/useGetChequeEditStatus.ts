import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

export default () => {
  const NAMESPACE = useGetNamespace();
  const chequeEditStatus = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace?.chequeEditStatus,
    shallowEqual
  );

  return chequeEditStatus;
};
