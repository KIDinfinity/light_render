import { useMemo } from 'react';
import useGetPreDefineDecision from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPreDefineDecision';
import useGetPolicyStatus from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPolicyStatus';
import lodash from 'lodash';
export default ({ allReasonConfigList }: any) => {
  const policyStatus = useGetPolicyStatus();
  const preDefineDecision = useGetPreDefineDecision();
  return useMemo(() => {
    let finalList = allReasonConfigList;
    if (lodash.isArray(finalList) && preDefineDecision && policyStatus) {
      finalList = finalList?.filter((item) => item?.reasonType === 'NT');
    } else if (lodash.isArray(finalList)) {
      finalList = finalList?.filter((item) => item?.reasonType !== 'NT');
    }
    return finalList || [];
  }, [policyStatus, preDefineDecision, allReasonConfigList]);
};
