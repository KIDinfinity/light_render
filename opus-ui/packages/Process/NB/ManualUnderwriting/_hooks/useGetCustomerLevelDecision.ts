import { useMemo } from 'react';
import lodash from 'lodash';
import useGetRelateJointLifeCoverageInsured from 'process/NB/ManualUnderwriting/_hooks/useGetRelateJointLifeCoverageInsured';
import { formUtils } from 'basic/components/Form';

export default ({ coverageItem }: any) => {
  const relateJointLifeCoverageInsured = useGetRelateJointLifeCoverageInsured({
    coreCode: coverageItem?.coreCode,
  });

  return useMemo(() => {
    const mainCoverageDecision = formUtils.queryValue(coverageItem?.coverageDecision?.uwDecision);
    const jointLifeDecisionList = lodash.map(
      relateJointLifeCoverageInsured,
      (insured: any) => insured?.decision
    );
    return [mainCoverageDecision, ...jointLifeDecisionList];
  }, [relateJointLifeCoverageInsured, coverageItem]);
};
