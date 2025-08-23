import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { subtract, multiply } from '@/utils/precisionUtils';

const saveClaimIncidentPayableItem = (state: any, action: any) => {
  const { changedFields, claimIncidentPayableId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'claimDecision')) {
        const payableId = lodash.get(
          draftState,
          `claimEntities.claimIncidentPayableListMap.${claimIncidentPayableId}.payableId`
        );
        const claimIncidentPayableList = lodash.get(
          draftState,
          `claimEntities.claimPayableListMap.${payableId}.claimIncidentPayableList`
        );
        const otherPayableList = lodash.filter(
          claimIncidentPayableList,
          (id) => id !== claimIncidentPayableId
        );
        const value = changedFields.claimDecision.value;
        const targetList = lodash
          .map(otherPayableList, (id) =>
            formUtils.queryValue(
              draftState.claimEntities.claimIncidentPayableListMap[id].claimDecision
            )
          )
          .concat([value]);

        if (lodash.every(targetList, (item) => item === value)) {
          draftState.claimEntities.claimPayableListMap[payableId].claimDecision = value;
        } else {
          const result = [
            { claimDecision: ClaimDecision.approve, result: false },
            { claimDecision: ClaimDecision.pending, result: false },
            { claimDecision: ClaimDecision.deny, result: false },
          ];
          lodash.forEach(targetList, (item) => {
            if (item === ClaimDecision.approve) {
              result[0].result = true;
            }
            if (item === ClaimDecision.pending) {
              result[1].result = true;
            }
            if (item === ClaimDecision.deny) {
              result[2].result = true;
            }
          });
          draftState.claimEntities.claimPayableListMap[
            payableId
          ].claimDecision = lodash.find(result, { result: true })
            ? lodash.find(result, { result: true })?.claimDecision
            : '';
        }

        if (ClaimDecision.deny === formUtils.queryValue(changedFields.claimDecision)) {
          changedFields.systemCalculationAmount = 0;
          changedFields.assessorOverrideAmount = null;
          changedFields.payableAmount = 0;
          changedFields.payableDays = null;
        }
      }

      if (lodash.has(changedFields, 'assessorOverrideAmount')) {
        const payableAmount = formUtils.queryValue(changedFields.assessorOverrideAmount);
        changedFields.payableAmount = payableAmount;
      }

      if (lodash.has(changedFields, 'reasonDate')) {
        changedFields.referenceDate = changedFields.reasonDate.value;
      }

      if (lodash.has(changedFields, 'benefitItemCode')) {
        const isTargetBenefitItemCode =
          formUtils.queryValue(changedFields.benefitItemCode) === 'C501';
        if (isTargetBenefitItemCode) {
          const currentClaimIncidentPayable = lodash.get(
            draftState,
            `claimEntities.claimIncidentPayableListMap[${claimIncidentPayableId}]`
          );
          const {
            annuityInstallmentTimes,
            annuityPayToTimes,
            claimDecision,
          } = lodash.pick(currentClaimIncidentPayable, [
            'annuityInstallmentTimes',
            'annuityPayToTimes',
            'annuityRemainingTimes',
            'claimDecision',
          ]);
          if (lodash.isEmpty(annuityInstallmentTimes)) {
            changedFields.annuityInstallmentTimes = lodash.includes(
              [ClaimDecision.approve, ClaimDecision.pending],
              formUtils.queryValue(claimDecision)
            )
              ? 1
              : 0;
          }
          if (lodash.isEmpty(annuityPayToTimes)) {
            changedFields.annuityPayToTimes = 12;
          }
        }
      }
      if (lodash.has(changedFields, 'annuityPayToTimes')) {
        const annuityInstallmentTimes = formUtils.queryValue(
          lodash.get(
            draftState,
            `claimEntities.claimIncidentPayableListMap[${claimIncidentPayableId}].annuityInstallmentTimes`
          )
        );
        const calculationAmount = formUtils.queryValue(
          lodash.get(
            draftState,
            `claimEntities.claimIncidentPayableListMap[${claimIncidentPayableId}].calculationAmount`
          )
        );
        const annuityPayToTimes = formUtils.queryValue(
          lodash.get(changedFields, 'annuityPayToTimes')
        );
        changedFields.annuityRemainingTimes = subtract(annuityInstallmentTimes, annuityPayToTimes);
        changedFields.assessorOverrideAmount = multiply(annuityPayToTimes, calculationAmount);
        changedFields.payableAmount = multiply(annuityPayToTimes, calculationAmount);
      }
    }

    draftState.claimEntities.claimIncidentPayableListMap[claimIncidentPayableId] = {
      ...state.claimEntities.claimIncidentPayableListMap[claimIncidentPayableId],
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveClaimIncidentPayableItem;
