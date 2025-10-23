import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetPolicyDecision from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPolicyDecision';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { useEffect } from 'react';

export default () => {
  const dispatch = useDispatch();
  const policyDecision = useGetPolicyDecision();
  const decision = formUtils.queryValue(lodash.chain(policyDecision).get('decisionCode').value());
  const loadFacutativeInfoChangeFlag = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.loadFacutativeInfoChangeFlag,
    shallowEqual
  );
  const { applicationNo } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData,
    shallowEqual
  );
  const { caseCategory, activityKey } = useSelector(
    ({ processTask }: any) => processTask.getTask,
    shallowEqual
  );

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getFacultativeInfo`,
    });
  }, [loadFacutativeInfoChangeFlag, decision, applicationNo, caseCategory, activityKey]);
};
