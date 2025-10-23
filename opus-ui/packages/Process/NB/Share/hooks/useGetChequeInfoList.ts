import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';

export default () => {
  const NAMESPACE = useGetNamespace();
  const chequeInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.chequeInfoList,
    shallowEqual
  );
  return chequeInfoList;
};
