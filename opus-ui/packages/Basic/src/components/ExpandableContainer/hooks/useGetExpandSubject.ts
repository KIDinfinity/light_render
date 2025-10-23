import { useContext } from 'react';
import Context from '../Context';

export default () => {
  const { subject } = useContext(Context);

  return subject;
};
