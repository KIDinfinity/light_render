import React from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Decision from 'process/NB/ManualUnderwriting/Decision/Edit';
import Fund from 'process/NB/ManualUnderwriting/Fund/Edit';
import PolicyReplacement from 'process/NB/ManualUnderwriting/PolicyReplacement/Edit';
import Loan from 'process/NB/ManualUnderwriting/Loan/Edit';
import useJudgeDisplayFundSection from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFundSection';

const PlanInfo: React.FC = () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );

  const fundVisible = useJudgeDisplayFundSection();
  const loanProtection = lodash.get(businessData, 'policyList[0].loanProtection');

  return (
    <>
      <Decision mode="edit" />

      {loanProtection === 'Y' && <Loan />}

      <PolicyReplacement />
      {!!fundVisible && <Fund />}
    </>
  );
};

PlanInfo.displayName = 'planInfo';

export default PlanInfo;
