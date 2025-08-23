import { useSelector } from 'dva';

export default (namespace: string) => {
  const model = useSelector(({ [namespace]: namespaceModel }) => namespaceModel);
  return model;
};
