import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import useGetSubmissionDate from 'process/NB/ManualUnderwriting/_hooks/useGetSubmissionDate';
import useGetCustomerAgeByCoverage from 'process/NB/ManualUnderwriting/_hooks/useGetCustomerAgeByCoverage';
import useGetPlanProductDuration from 'process/NB/ManualUnderwriting/_hooks/useGetPlanProductDuration';

export default ({ coverageItem }: any) => {
  const submissionDate = useGetSubmissionDate();
  const issueAge = useGetCustomerAgeByCoverage({
    coverageItem,
  });
  const coreCode = useMemo(() => {
    return formUtils.queryValue(coverageItem?.coreCode);
  }, [coverageItem]);
  const planProductDuration = useGetPlanProductDuration();
  return useMemo(() => {
    const key = `${coreCode}-${issueAge}-${submissionDate}`;
    return lodash.get(planProductDuration, key) || [];
  }, [submissionDate, issueAge, coreCode, planProductDuration]);
};
