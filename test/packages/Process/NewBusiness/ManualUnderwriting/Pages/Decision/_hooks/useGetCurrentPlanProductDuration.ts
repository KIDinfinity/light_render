import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import useGetCustomerAgeByCoverage from 'decision/_hooks/useGetCustomerAgeByCoverage';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ coverageItem }: any) => {
  const submissionDate = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.planInfoData.submissionDate,
    shallowEqual
  );
  const issueAge = useGetCustomerAgeByCoverage({
    coverageItem,
  });
  const coreCode = useMemo(() => {
    return formUtils.queryValue(coverageItem?.coreCode);
  }, [coverageItem]);
  const planProductDuration = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.planProductDuration,
    shallowEqual
  );
  return useMemo(() => {
    const key = `${coreCode}-${issueAge}-${submissionDate}`;
    return lodash.get(planProductDuration, key) || [];
  }, [submissionDate, issueAge, coreCode, planProductDuration]);
};
