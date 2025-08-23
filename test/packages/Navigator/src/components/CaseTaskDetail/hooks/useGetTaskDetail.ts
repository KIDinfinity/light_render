import { useContext } from 'react';
import Context from '../Context';

export default () => {
  const { taskDetail }: any = useContext(Context);
  return taskDetail;
};
