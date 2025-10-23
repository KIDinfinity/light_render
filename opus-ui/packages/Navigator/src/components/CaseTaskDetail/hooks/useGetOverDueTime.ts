import { useContext } from 'react';
import Context from '../Context';

export default () => {
  const { overdueTime }: any = useContext(Context);

  return overdueTime;
};
