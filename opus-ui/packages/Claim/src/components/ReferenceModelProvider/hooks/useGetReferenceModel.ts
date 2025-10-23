import { useContext } from 'react';
import Context from '../Context';

export default () => {
  const { referenceModel } = useContext(Context);

  return referenceModel;
};
