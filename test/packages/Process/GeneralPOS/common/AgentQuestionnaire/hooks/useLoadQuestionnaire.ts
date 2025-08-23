import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';

export default ({ agentInfo, caseCategory, inquiryBusinessNo }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lodash.isEmpty(agentInfo?.agentNumber)) {
      dispatch({
        type: `${NAMESPACE}/getAllQuestionConfig`,
        payload: {
          agentInfo,
          caseCategory,
          inquiryBusinessNo,
        },
      });
    }
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearState`,
      });
    };
  }, [agentInfo, caseCategory, inquiryBusinessNo]);
};
