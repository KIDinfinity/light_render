import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';

export default ({ policyInfo, inquiryBusinessNo, caseCategory }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lodash.isEmpty(policyInfo)) {
      dispatch({
        type: `${NAMESPACE}/getAllQuestionConfig`,
        payload: {
          policyInfo,
          inquiryBusinessNo,
          caseCategory,
        },
      });
    }
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearState`,
      });
    };
  }, [policyInfo, inquiryBusinessNo, caseCategory]);
};
