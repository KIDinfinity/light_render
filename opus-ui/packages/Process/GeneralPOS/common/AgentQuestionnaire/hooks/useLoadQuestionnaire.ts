import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';

export default ({ agentInfo, caseCategory, businessNo }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lodash.isEmpty(agentInfo?.agentNumber)) {
      dispatch({
        type: `${NAMESPACE}/getAllQuestionConfig`,
        payload: {
          agentInfo,
          caseCategory,
          businessNo,
        },
      });
    }
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearState`,
      });
    };
  }, [agentInfo, caseCategory, businessNo]);
};
