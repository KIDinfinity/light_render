import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import CaseCategory from 'process//NB/Enum/CaseCategory';
import { formUtils } from 'basic/components/Form';
import useGetPolicyDecision from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPolicyDecision';
import PolicyLevelDecision from 'process/NewBusiness/Enum/PolicyLevelDecision';

export default () => {
  const caseCategory = useSelector(({ processTask }: any) => {
    return processTask?.getTask?.caseCategory;
  }, shallowEqual);
  const policyDecision = useGetPolicyDecision();
  const decisionCode = useMemo(() => {
    return formUtils.queryValue(lodash.chain(policyDecision).get('decisionCode').value());
  }, [policyDecision]);
  return useMemo(() => {
    if (decisionCode === PolicyLevelDecision.Approve && caseCategory === CaseCategory.BP_AP_CTG02) {
      return true;
    }
    return false;
  }, [caseCategory, decisionCode]);
};
