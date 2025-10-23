import { useContext } from 'react';
import Context from 'process/NB/ManualUnderwriting/SustainabilityCaseModal/CheckingProvider/Context';

export default () => {
  const { checking, editableOfSustainability } = useContext(Context);

  return { checking, editableOfSustainability };
};
