import { useEffect, useContext } from 'react';
import lodash from 'lodash';
import context from '../Context/context';

export default ({ errors }: any) => {
  const { dispatch } = useContext(context);
  const debounce = lodash.debounce(() => {
    dispatch({
      type: 'updateErrors',
      payload: {
        errors,
      },
    });
  }, 1000);
  useEffect(() => {
    window.requestIdleCallback(() => {
      debounce();
    });
  }, [errors]);
};
