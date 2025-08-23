import { useCallback } from 'react';
import { useDispatch } from 'dva';

export default () => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch({
      type: `agentQuestionnaireController/saveVisible`,
      payload: { visible: true },
    });
  }, [dispatch]);
};
