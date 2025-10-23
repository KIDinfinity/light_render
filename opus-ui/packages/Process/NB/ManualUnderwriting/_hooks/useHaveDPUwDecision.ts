import { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import BenefitLevelDecision from 'process/NB/Enum/BenefitLevelDecision';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

export default () => {
  const coverageList = useGetCoverageList();
  return useMemo(() => {
    const haveDPUwDecision = lodash
      .chain(coverageList)
      .find(
        (item) =>
          lodash.includes(
            [BenefitLevelDecision.Decline, BenefitLevelDecision.Postpone],
            formUtils.queryValue(item?.coverageDecision?.uwDecision)
          )
      )
      .value();
    return !lodash.isEmpty(haveDPUwDecision);
  }, [coverageList]);
};
