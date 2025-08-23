import { useContext } from 'react';
import Context from 'basic/components/DataProvider/Context';

export default () => {
  const { data } = useContext(Context);

  return data;
};
