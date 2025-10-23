import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useGetSubmissionDate from 'process/NB/ManualUnderwriting/_hooks/useGetSubmissionDate';
import useGetCustomerAgeByCoverage from 'process/NB/ManualUnderwriting/_hooks/useGetCustomerAgeByCoverage';

export default ({ coverageItem }: any) => {
  const dispatch = useDispatch();
  const customerAge = useGetCustomerAgeByCoverage({ coverageItem });

  const submissionDate = useGetSubmissionDate();
  return useCallback(
    ({ coreCode }: any) => {
      if (coreCode && customerAge && submissionDate) {
        dispatch({
          type: `${NAMESPACE}/loadPlanProductDuration`,
          payload: {
            issueAge: customerAge,
            coreCode,
            submissionDate,
          },
        });
      }
    },
    [dispatch, customerAge, submissionDate]
  );
};
