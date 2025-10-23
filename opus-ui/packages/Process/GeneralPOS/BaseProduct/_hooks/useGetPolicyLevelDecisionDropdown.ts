import { useMemo } from 'react';
import lodash from 'lodash';
import { BenefitLevelDecisionEnum, PolicyLevelDecisionEnum } from 'process/GeneralPOS/common/Enum';
import { formUtils } from 'basic/components/Form';

export default (coverageListString) => {
  return useMemo(() => {
    const coverageList = coverageListString.split('-').map((item) => ({
      mainFlag: item.includes('[') ? true : false,
      decision: `${item}`.replace('[', ''),
    }));
    const policyLevelDecisionFullList = [
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'A',
        dictName: 'Approve',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'P',
        dictName: 'Postpone',
      },
      {
        typeCode: 'Dropdown_UW_PolicyDecision',
        dictCode: 'D',
        dictName: 'Decline',
      },
    ];
    const basicPlanDecision = formUtils.queryValue(
      lodash
        .chain(coverageList)
        .find((item: any) => item.mainFlag)
        .get('decision')
        .value()
    );
    const allCoverageDecision = lodash.map(coverageList, (item) => item.decison);

    const anyBenefitDecisionIsRefer = allCoverageDecision.includes(BenefitLevelDecisionEnum.Refer);

    const anyBenefitDecisionIsEvidenceRequired = allCoverageDecision.includes(
      BenefitLevelDecisionEnum.EvidenceRequired
    );

    const anyBenefitDecisionIsNonStandard = allCoverageDecision.includes(
      BenefitLevelDecisionEnum.NonStandard
    );

    const anyBenefitDecisionIsStandard = allCoverageDecision.includes(
      BenefitLevelDecisionEnum.Standard
    );

    const basicPlanDecisionIsDeline = lodash.isEqual(
      basicPlanDecision,
      BenefitLevelDecisionEnum.Decline
    );
    const basicPlanDecisionIsPospone = lodash.isEqual(
      basicPlanDecision,
      BenefitLevelDecisionEnum.Postpone
    );

    const anyRiderIsPosponeOrDecline = lodash
      .chain(coverageList)
      .filter((item) => {
        return !item.mainFlag;
      })
      .some((coverage: any) => {
        return lodash.includes(
          [BenefitLevelDecisionEnum.Postpone, BenefitLevelDecisionEnum.Decline],
          lodash.get(coverage, 'decision')
        );
      })
      .value();

    let list = [
      PolicyLevelDecisionEnum.Approve,
      PolicyLevelDecisionEnum.Decline,
      PolicyLevelDecisionEnum.Postpone,
    ];
    if (
      !basicPlanDecisionIsDeline &&
      !basicPlanDecisionIsPospone &&
      !anyRiderIsPosponeOrDecline &&
      !anyBenefitDecisionIsNonStandard
    ) {
      list = [PolicyLevelDecisionEnum.Approve];
    }

    if (basicPlanDecisionIsPospone) {
      list = [PolicyLevelDecisionEnum.Postpone];
    }

    if (basicPlanDecisionIsDeline) {
      list = [PolicyLevelDecisionEnum.Decline];
    }
    if (anyBenefitDecisionIsRefer || anyBenefitDecisionIsEvidenceRequired) {
      list = [PolicyLevelDecisionEnum.Decline, PolicyLevelDecisionEnum.Postpone];
    }
    if (anyBenefitDecisionIsNonStandard) {
      list = [
        PolicyLevelDecisionEnum.Approve,
        PolicyLevelDecisionEnum.Decline,
        PolicyLevelDecisionEnum.Postpone,
      ];
    }
    if (!basicPlanDecisionIsDeline && !basicPlanDecisionIsPospone && anyRiderIsPosponeOrDecline) {
      list = [
        PolicyLevelDecisionEnum.Approve,
        PolicyLevelDecisionEnum.Decline,
        PolicyLevelDecisionEnum.Postpone,
      ];
    }
    return lodash.filter(policyLevelDecisionFullList, (item: any) => {
      return list.includes(item.dictCode);
    });
  }, [coverageListString]);
};
