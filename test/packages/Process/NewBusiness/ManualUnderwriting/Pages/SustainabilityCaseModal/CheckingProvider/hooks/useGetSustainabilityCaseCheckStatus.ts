import { useContext } from 'react';
import Context from '../Context';

export default () => {
  const { checking, editableOfSustainability } = useContext(Context);

  return { checking, editableOfSustainability };
};
