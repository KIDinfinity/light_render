import { useEffect, useContext } from 'react';
import context from '../Context/context';

export default (selector: any) => {
  const { dispatch } = useContext(context);

  useEffect(() => {
    dispatch({
      type: 'setClaimDataSelector',
      payload: selector,
    });
  }, []);
};
