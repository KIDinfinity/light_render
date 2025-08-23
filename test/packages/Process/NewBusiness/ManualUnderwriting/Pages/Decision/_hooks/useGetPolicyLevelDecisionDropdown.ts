import { useMemo } from 'react';
import lodash from 'lodash';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import PolicyLevelDecision from 'process/NewBusiness/Enum/PolicyLevelDecision';
import useGetCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetCoverageList';
import { formUtils } from 'basic/components/Form';

export default () => {
  const coverageList = useGetCoverageList();
  const basicPlanDecision = useMemo(() => {
    const fieldItem = lodash
      .chain(coverageList)
      .find((item: any) => item.isMain === 'Y')
      .get('coverageDecision.uwDecision')
      .value();
    return formUtils.queryValue(fieldItem);
  }, [coverageList]);
  return useMemo(() => {
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
    const anyBenefitDecisionIsRefer = (() => {
      return lodash.some(coverageList, (coverage: any) => {
        const value = formUtils.queryValue(lodash.get(coverage, 'coverageDecision.uwDecision'));
        return value === BenefitLevelDecision.Refer;
      });
    })();
    const anyBenefitDecisionIsEvidenceRequired = (() => {
      return lodash.some(coverageList, (coverage: any) => {
        const value = formUtils.queryValue(lodash.get(coverage, 'coverageDecision.uwDecision'));
        return value === BenefitLevelDecision.EvidenceRequired;
      });
    })();
    const anyBenefitDecisionIsNonStandard = (() => {
      return lodash.some(coverageList, (coverage: any) => {
        return (
          formUtils.queryValue(lodash.get(coverage, 'coverageDecision.uwDecision')) ===
          BenefitLevelDecision.NonStandard
        );
      });
    })();
    const allBenefitDecisionIsStandard = (() => {
      return lodash.every(coverageList, (coverage: any) => {
        return (
          formUtils.queryValue(lodash.get(coverage, 'coverageDecision.uwDecision')) ===
          BenefitLevelDecision.Standard
        );
      });
    })();

    const basicPlanDecisionIsDeline = (() => {
      return lodash.isEqual(basicPlanDecision, BenefitLevelDecision.Decline);
    })();
    const basicPlanDecisionIsPospone = (() => {
      return lodash.isEqual(basicPlanDecision, BenefitLevelDecision.Postpone);
    })();

    const anyRiderIsPosponeOrDecline = (() => {
      return lodash
        .chain(coverageList)
        .filter((item) => {
          return item.isMain === 'N';
        })
        .some((coverage: any) => {
          return lodash.includes(
            [BenefitLevelDecision.Postpone, BenefitLevelDecision.Decline],
            formUtils.queryValue(lodash.get(coverage, 'coverageDecision.uwDecision'))
          );
        })
        .value();
    })();
    if (allBenefitDecisionIsStandard) {
      return lodash.filter(policyLevelDecisionFullList, (item: any) => {
        return lodash.includes(
          [PolicyLevelDecision.Approve, PolicyLevelDecision.Decline, PolicyLevelDecision.Postpone],
          item.dictCode
        );
      });
    }
    if (basicPlanDecisionIsPospone) {
      return lodash.filter(policyLevelDecisionFullList, (item: any) => {
        return [PolicyLevelDecision.Postpone].includes(item.dictCode);
      });
    }

    if (basicPlanDecisionIsDeline) {
      return lodash.filter(policyLevelDecisionFullList, (item: any) =>
        [PolicyLevelDecision.Decline].includes(item.dictCode)
      );
    }
    if (anyBenefitDecisionIsRefer || anyBenefitDecisionIsEvidenceRequired) {
      return lodash.filter(policyLevelDecisionFullList, (item: any) =>
        lodash.includes([PolicyLevelDecision.Decline, PolicyLevelDecision.Postpone], item.dictCode)
      );
    }
    if (anyBenefitDecisionIsNonStandard) {
      return lodash.filter(policyLevelDecisionFullList, (item: any) => {
        return lodash.includes(
          [PolicyLevelDecision.Approve, PolicyLevelDecision.Decline, PolicyLevelDecision.Postpone],
          item.dictCode
        );
      });
    }
    if (!basicPlanDecisionIsDeline && !basicPlanDecisionIsPospone && anyRiderIsPosponeOrDecline) {
      return lodash.filter(policyLevelDecisionFullList, (item: any) => {
        return lodash.includes(
          [PolicyLevelDecision.Approve, PolicyLevelDecision.Decline, PolicyLevelDecision.Postpone],
          item.dictCode
        );
      });
    }
    return policyLevelDecisionFullList;
  }, [basicPlanDecision, coverageList]);
};
