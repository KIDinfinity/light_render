import { useEffect, useContext } from 'react';
import context from '../Context/context';
import type { CommonActionLife } from '../constants';

export default (commonActionLife: CommonActionLife) => {
  const { dispatch } = useContext(context);

  useEffect(() => {
    dispatch({
      type: 'setCommonActionLife',
      payload: {
        commonActionLife,
      },
    });
  }, []);
};
