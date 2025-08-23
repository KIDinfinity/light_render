import { useCallback } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useGetCustomerAgeByCoverage from 'decision/_hooks/useGetCustomerAgeByCoverage';

export default ({ coverageItem }: any) => {
  const dispatch = useDispatch();
  const customerAge = useGetCustomerAgeByCoverage({ coverageItem });

  const submissionDate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.planInfoData.submissionDate,
    shallowEqual
  );
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
