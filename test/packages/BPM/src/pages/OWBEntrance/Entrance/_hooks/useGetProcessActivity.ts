import { useContext } from 'react';
import Context from 'bpm/pages/OWBEntrance/Context/context';

export default () => {
  const { state } = useContext(Context);

  return state?.taskDetail?.taskDefKey;
};
