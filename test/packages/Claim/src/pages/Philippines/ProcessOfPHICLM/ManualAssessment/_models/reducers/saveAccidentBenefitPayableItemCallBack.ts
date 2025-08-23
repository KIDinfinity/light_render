import { produce } from 'immer';
import lodash, { forEach, find, get } from 'lodash';
import { add, subtract } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import { getAccumulateLimitList, calculateRemainingDays } from '../functions/fnObject';

enum FullyClaimCode {
  A = 'A',
  F = 'F',
  H = 'H',
}

const saveAccidentBenefitPayableItemCallBack = (state: any, action: any) => {
  const { treatmentPayableId, id } = action.payload;
  const { listPolicy } = state;
  const nextState = produce(state, (draftState: any) => {
    const {
      claimEntities: { treatmentPayableListMap, accidentBenefitPayableListMap },
    } = draftState;
    const tempDraftState = draftState;
    const treatmentPayableItem = treatmentPayableListMap[treatmentPayableId];
    if (!treatmentPayableItem) return;
    const { policyNo, productCode, accidentBenefitPayableList } = treatmentPayableItem;
    let fullyClaimIsF = false;
    let fullyClaimCodeValue = false;
    let totalPayableAmount = 0;
    forEach(accidentBenefitPayableList, (item) => {
      const accidentBenefitPayableItem = accidentBenefitPayableListMap[item];
      const policyBenefitPayableItem = find(listPolicy, {
        policyNo: formUtils.queryValue(policyNo),
        coreProductCode: formUtils.queryValue(productCode),
        benefitItemCode: formUtils.queryValue(accidentBenefitPayableItem.benefitItemCode),
      });
      const accidentBenefit = get(policyBenefitPayableItem, 'accidentBenefit', {});
      const { fullyClaimCode, accumulatePayableAmount } = accidentBenefit;
      if (fullyClaimCode === FullyClaimCode.F || fullyClaimCode === FullyClaimCode.H) {
        fullyClaimIsF = true;
        fullyClaimCodeValue = fullyClaimCode;
      }
      if (fullyClaimCode === FullyClaimCode.A) {
        fullyClaimCodeValue = fullyClaimCode;
        const tempTotal = add(
          Number(accumulatePayableAmount),
          accidentBenefitPayableItem.payableAmount
        );
        totalPayableAmount = add(totalPayableAmount, tempTotal);
      }
    });
    treatmentPayableItem.fullyClaimCode = fullyClaimCodeValue;
    if (fullyClaimIsF || totalPayableAmount >= treatmentPayableItem.benefitAmount) {
      treatmentPayableItem.fullyClaim = true;
    } else {
      treatmentPayableItem.fullyClaim = false;
    }

    if (!id) return;
    const remainingDaysList = lodash.reduce(
      draftState?.remainingDaysList,
      (result: any, item: any, key: string) => {
        if (
          lodash.some(
            accidentBenefitPayableListMap,
            (benefit) =>
              benefit?.policyNo === item?.policyNo &&
              benefit?.productCode === item?.productCode &&
              benefit?.benefitTypeCode === item?.benefitTypeCode &&
              formUtils.queryValue(benefit?.benefitItemCode) === item?.benefitItemCode
          )
        ) {
          return { ...result, [key]: item };
        }
        return result;
      },
      {}
    );
    tempDraftState.remainingDaysList = remainingDaysList;

    const accidentBenefitPayableItem = accidentBenefitPayableListMap?.[id];
    if (accidentBenefitPayableItem) {
      const { benefitItemCode, payableDays, benefitTypeCode } = formUtils.cleanValidateData(
        accidentBenefitPayableItem
      );
      const accumulateLimitList = getAccumulateLimitList(
        accidentBenefitPayableItem,
        state.listPolicy
      );
      const source = lodash.find(accumulateLimitList, {
        limitCode: 'share_weeks_per_disability_limit',
      });
      const exists = lodash.has(
        draftState.remainingDaysList,
        `${policyNo}${productCode}${benefitTypeCode}${benefitItemCode}`
      );
      if (source && !exists) {
        const { shareItems } = source;
        const remainingDaysItem = {
          [`${policyNo}${productCode}${benefitTypeCode}${shareItems}`]: {
            accumulateValue: payableDays,
            benefitItemCode,
            policyNo,
            benefitTypeCode,
            productCode,
          },
        };
        tempDraftState.remainingDaysList = {
          ...draftState.remainingDaysList,
          ...remainingDaysItem,
        };
      }
    }
    lodash.forEach(accidentBenefitPayableListMap, (item: any) => {
      const tempItem = item;
      const {
        benefitItemCode,
        policyNo: cpolicyNo,
        productCode: cproductCode,
        benefitTypeCode,
      } = formUtils.cleanValidateData(item);
      const accumulateLimitList = getAccumulateLimitList(item, state.listPolicy);
      const remainingDaysItem = lodash.get(
        draftState.remainingDaysList,
        `${cpolicyNo}${cproductCode}${benefitTypeCode}${benefitItemCode}`
      );
      if (remainingDaysItem) {
        tempItem.remainingDays = Math.max(
          subtract(calculateRemainingDays(accumulateLimitList), remainingDaysItem?.accumulateValue),
          0
        );
      }
    });
  });
  return { ...nextState };
};

export default saveAccidentBenefitPayableItemCallBack;
