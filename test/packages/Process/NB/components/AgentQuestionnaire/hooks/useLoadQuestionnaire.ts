import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';

export default ({ businessNo, agentData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lodash.isEmpty(agentData?.agentNo)) {
      dispatch({
        type: `${NAMESPACE}/getAllQuestionConfig`,
        payload: {
          businessNo,
          agentData,
        },
      });
    }
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearState`,
      });
    };
  }, [businessNo, agentData]);
};
