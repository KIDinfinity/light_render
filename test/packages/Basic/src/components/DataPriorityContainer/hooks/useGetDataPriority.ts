import { useContext } from 'react';
import Context from '../Context';

export default () => {
  const { dataPriority } = useContext(Context);

  return dataPriority;
};
