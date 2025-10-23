import { useContext } from 'react';
import Context from '../Context';

export default () => {
  const { mode } = useContext(Context);
  return mode;
};
