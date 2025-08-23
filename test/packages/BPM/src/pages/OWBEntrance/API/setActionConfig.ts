import { useEffect, useContext } from 'react';
import context from '../Context/context';

export default (actionConfig: Object = {}) => {
  const { dispatch } = useContext(context);

  useEffect(() => {
    dispatch({
      type: 'setActionConfig',
      payload: {
        actionConfig,
      },
    });
    return () => {
      dispatch({
        type: 'setActionConfig',
        payload: {}
      })
    }
  }, [actionConfig]);
};
