import { useContext } from 'react';
import Context from 'basic/components/NamespaceProvider/Context';

export default () => {
  const { namespace } = useContext(Context);

  return namespace;
};
