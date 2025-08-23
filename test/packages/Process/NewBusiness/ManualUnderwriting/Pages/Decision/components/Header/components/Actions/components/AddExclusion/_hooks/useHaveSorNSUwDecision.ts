import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';

const decisionParams = [BenefitLevelDecision.NonStandard, BenefitLevelDecision.Standard];

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    const haveUwDecision = lodash
      .chain(coverageList)
      .find((item) =>
        decisionParams.includes(formUtils.queryValue(item?.coverageDecision?.uwDecision))
      )
      .value();
    return !lodash.isEmpty(haveUwDecision);
  }, [coverageList]);
};
