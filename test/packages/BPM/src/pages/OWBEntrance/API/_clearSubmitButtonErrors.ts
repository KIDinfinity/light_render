import { useEffect, useContext, useState } from 'react';
import context from '../Context/context';

export default () => {
  const { dispatch } = useContext(context);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (flag) {
      dispatch({
        type: 'clearSubmitButtonErrors',
      });

      setFlag(false);
    }
  }, [flag]);

  return () => {
    setFlag(true);
  };
};
