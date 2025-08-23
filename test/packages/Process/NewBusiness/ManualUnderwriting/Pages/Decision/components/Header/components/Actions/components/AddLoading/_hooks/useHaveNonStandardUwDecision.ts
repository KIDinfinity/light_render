import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    const haveNonStandardUwDecision = lodash
      .chain(coverageList)
      .find((item) => formUtils.queryValue(item?.coverageDecision?.uwDecision) === BenefitLevelDecision.NonStandard)
      .value();
    return !lodash.isEmpty(haveNonStandardUwDecision);
  }, [coverageList]);
};
