import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/deleteClientDetail`,
      payload: {
        id,
      },
    });
    dispatch({
      type: `${NAMESPACE}/deletePlanInfoClientName`,
      payload: {
        id,
      },
    });
  }, []);
};
