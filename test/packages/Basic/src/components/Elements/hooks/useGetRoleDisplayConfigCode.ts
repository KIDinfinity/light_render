import { useContext } from 'react';
import Context from 'basic/components/Elements/Context';

export default () => {
  const { roleDisplayConfigCode } = useContext(Context);

  return roleDisplayConfigCode;
};
