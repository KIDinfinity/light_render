import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE, DependencyNAMESPACE } from '../activity.config';

export default ({ businessData }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${DependencyNAMESPACE}/saveBizData`,
      payload: {
        businessData: { ...(businessData.proposal || {}) },
      },
    });
    dispatch({
      type: `${NAMESPACE}/saveBizData`,
      payload: {
        businessData,
      },
    });
    return () => {
      dispatch({
        type: `${DependencyNAMESPACE}/clearBizData`,
      });
      dispatch({
        type: `${NAMESPACE}/clearBizData`,
      });
    };
  }, [businessData]);
};
