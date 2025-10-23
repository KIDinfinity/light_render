import { useCallback } from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import BenefitLevelDecision from 'process/NB/Enum/BenefitLevelDecision';
import PolicyLevelDecision from 'process/NB/Enum/PolicyLevelDecision';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';
import useGetPolicyDecision from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyDecision';
import { formUtils } from 'basic/components/Form';

export default () => {
  const dispatch = useDispatch();
  const originCoverageList = useGetCoverageList();
  const policyDecisionSource = useGetPolicyDecision();

  return useCallback(
    ({ uwDecision, id }) => {
      const coverageList = lodash.map(originCoverageList, (item) => {
        if (id === item.id) {
          return {
            ...item,
            coverageDecision: {
              ...item?.coverageDecision,
              uwDecision,
            },
          };
        }
        return item;
      });

      const policyDecision = (() => {
        const anyBenefitDecisionIsRefer = (() => {
          return lodash.some(coverageList, (coverage: any) => {
            const value = formUtils.queryValue(lodash.get(coverage, 'coverageDecision.uwDecision'));
            return value === BenefitLevelDecision.Refer;
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

        const basicPlanValue = formUtils.queryValue(
          lodash
            .chain(coverageList)
            .find((item: any) => item?.isMain === 'Y')
            .get('coverageDecision.uwDecision')
            .value()
        );

        const basicPlanDecisionIsDeline = (() => {
          return lodash.isEqual(basicPlanValue, BenefitLevelDecision.Decline);
        })();
        const basicPlanDecisionIsPospone = (() => {
          return lodash.isEqual(basicPlanValue, BenefitLevelDecision.Postpone);
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
        if (basicPlanDecisionIsPospone) {
          return PolicyLevelDecision.Postpone;
        }

        if (basicPlanDecisionIsDeline) {
          return PolicyLevelDecision.Decline;
        }

        if (
          lodash.every(
            coverageList,
            (item: any) =>
              formUtils.queryValue(item?.coverageDecision?.uwDecision) ===
              BenefitLevelDecision.Standard
          ) ||
          lodash.every(
            coverageList,
            (item: any) =>
              formUtils.queryValue(item?.coverageDecision?.uwDecision) ===
              BenefitLevelDecision.NonStandard
          )
        ) {
          return PolicyLevelDecision.Approve;
        }
        if (anyBenefitDecisionIsRefer) {
          return '';
        }
        if (anyBenefitDecisionIsNonStandard) {
          return '';
        }
        if (
          !basicPlanDecisionIsPospone &&
          !basicPlanDecisionIsDeline &&
          anyRiderIsPosponeOrDecline
        ) {
          return '';
        }

        return lodash.get(policyDecisionSource, 'decisionCode', null);
      })();

      const basicPlanValue = formUtils.queryValue(
        lodash
          .chain(coverageList)
          .find((item) => item.isMain === 'Y')
          .get('coverageDecision.uwDecision')
          .value()
      );

      const isCurrentMain = lodash
        .chain(coverageList)
        .find((item) => item.id === id)
        .get('isMain')
        .isEqual('Y')
        .value();

      dispatch({
        type: `${NAMESPACE}/setPolicySection`,
        payload: {
          changedFields: {
            decisionCode: policyDecision,
          },
        },
      });

      if (
        isCurrentMain &&
        (basicPlanValue === BenefitLevelDecision.Decline ||
          basicPlanValue === BenefitLevelDecision.Postpone)
      ) {
        const newCoverageList = lodash
          .chain(coverageList)
          .map((coverage) => {
            if (coverage?.isMain && coverage?.isMain === 'Y') return coverage;
            if (
              coverage?.coverageDecision?.uwDecision &&
              coverage?.coverageDecision?.uwDecision === basicPlanValue
            )
              return coverage;
            const Decision = lodash.get(coverage, 'coverageDecision');
            if (!Decision || lodash.isNull(Decision)) {
              return { ...coverage, coverageDecision: { uwDecision: basicPlanValue } };
            }
            const newCoverage = lodash.set(coverage, 'coverageDecision.uwDecision', basicPlanValue);
            return newCoverage;
          })
          .value();
        dispatch({
          type: `${NAMESPACE}/updateCoverageListWhenHitSustainabilityChecking`,
          payload: {
            coverageList: newCoverageList,
          },
        });
      }
    },
    [originCoverageList, policyDecisionSource, dispatch]
  );
};
