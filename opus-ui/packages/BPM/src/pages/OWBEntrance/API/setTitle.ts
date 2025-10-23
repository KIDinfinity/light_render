import { useEffect, useContext } from 'react';
import context from '../Context/context';

export default (title: string = '') => {
  const { dispatch } = useContext(context);
  useEffect(() => {
    dispatch({
      type: 'setTitle',
      payload: title,
    });
  }, [title]);
};
