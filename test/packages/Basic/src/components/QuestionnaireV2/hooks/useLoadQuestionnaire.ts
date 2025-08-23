import { useEffect, useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from '../activity.config';

interface IParams {
  caseNo?: number;
  identityNo?: string;
  identityType?: string;
  caseCategory?: string;
  businessNo?: string;
  isNB?: boolean;
  agentData?: any;
}

export default ({
  identityNo,
  agentData,
  identityType,
  caseNo,
  caseCategory,
  businessNo,
  isNB,
}: IParams) => {
  const dispatch = useDispatch();
  const loadData = useCallback(() => {
    if (isNB) {
      dispatch({
        type: `${NAMESPACE}/saveState`,
        payload: { isNB },
      });
    }
    dispatch({
      type: `${NAMESPACE}/getAllQuestionConfig`,
      payload: {
        identityNo,
        identityType,
        caseNo,
        caseCategory,
        businessNo,
        agentData,
      },
    });
  }, [isNB, dispatch, identityNo, identityType, caseNo, caseCategory, businessNo]);
  useEffect(() => {
    loadData();
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearState`,
      });
    };
  }, [businessNo, dispatch, loadData]);
};
