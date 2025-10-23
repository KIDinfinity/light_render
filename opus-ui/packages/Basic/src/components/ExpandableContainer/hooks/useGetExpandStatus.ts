import { useContext } from 'react';
import Context from '../Context';

export default () => {
  const { expandStatus } = useContext(Context);

  return expandStatus;
};
