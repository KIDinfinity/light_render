import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default ({ id }: any) => {
  const dispatch = useDispatch();
  return useCallback(
    ({ crtItemId }) => {
      dispatch({
        type: `${NAMESPACE}/deleteCrtItem`,
        payload: {
          id,
          crtItemId,
        },
      });
    },
    [id]
  );
};
