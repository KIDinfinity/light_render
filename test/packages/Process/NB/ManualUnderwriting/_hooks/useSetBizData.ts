import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

export default ({ businessData }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveBizData`,
      payload: {
        businessData,
      },
    });
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearBizData`,
      });
    };
  }, [businessData]);
};
