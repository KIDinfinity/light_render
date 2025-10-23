import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';
import lodash from 'lodash';

export default ({ businessNo, policyInfo, caseCategory }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lodash.isEmpty(policyInfo)) {
      dispatch({
        type: `${NAMESPACE}/getAllQuestionConfig`,
        payload: {
          businessNo,
          policyInfo,
          caseCategory,
        },
      });
    }
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearState`,
      });
    };
  }, [businessNo, policyInfo, caseCategory]);
};
