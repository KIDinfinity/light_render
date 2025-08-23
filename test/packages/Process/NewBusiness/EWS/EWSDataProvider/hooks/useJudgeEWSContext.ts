import { useContext } from 'react';
import Context from '../Context';

export default () => {
  const state: any = useContext(Context);
  return !!state?.ewsContext;
};
