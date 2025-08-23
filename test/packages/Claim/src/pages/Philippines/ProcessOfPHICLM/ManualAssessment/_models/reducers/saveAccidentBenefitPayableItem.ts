import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {
  calculateRemainingDays,
  calculateRemainingYears,
  calculationAmount,
  getAccumulateLimitList,
  getAccumulateLimitItem,
  getManualAdd,
  getAccumulateBenefitItem,
} from '../functions/fnObject';
import { BenefitLimitCode } from '../dto/index';

const changePayableAmount = (target: any) => {
  const assessorOverrideAmount = formUtils.queryValue(target.assessorOverrideAmount);
  return lodash.isNumber(assessorOverrideAmount)
    ? assessorOverrideAmount
    : target.systemCalculationAmount;
};

const saveAccidentBenefitPayableItem = (state: any, action: any) => {
  const { benefitItemManualAddMap, listPolicy } = state;
  const { changedFields, id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // 同步changedFields到state对象中
    const tempDraftState = draftState;
    tempDraftState.claimEntities.accidentBenefitPayableListMap[id] = {
      ...state.claimEntities.accidentBenefitPayableListMap[id],
      ...changedFields,
    };
    const accidentBenefitPayableItem = draftState.claimEntities.accidentBenefitPayableListMap[id];
    // 获取accidentBenefitPayableListItem选中的listPolicy中的accumulateLimitList
    const accumulateLimitList = getAccumulateLimitList(accidentBenefitPayableItem, listPolicy);
    const accumulateBenefitItem = getAccumulateBenefitItem(accidentBenefitPayableItem, listPolicy);

    const fieldsArray = Object.entries(changedFields);
    if (fieldsArray.length === 1) {
      if (lodash.has(changedFields, 'benefitItemCode')) {
        accidentBenefitPayableItem.amountPerWeek = null;
        accidentBenefitPayableItem.saPercentagePerWeek = null;
        accidentBenefitPayableItem.saPercentage = null;
        accidentBenefitPayableItem.saPercentagePerYear = null;
        accidentBenefitPayableItem.maxAmountPerWeek = null;
        accidentBenefitPayableItem.maxAmountPerLifetime = null;
        accidentBenefitPayableItem.payableYears = null;
        accidentBenefitPayableItem.skipCalculate = accumulateBenefitItem.skipCalculate;

        accidentBenefitPayableItem.manualAdd = getManualAdd(
          benefitItemManualAddMap,
          changedFields.benefitItemCode.value
        );
        accidentBenefitPayableItem.remainingDays = calculateRemainingDays(accumulateLimitList);
        accidentBenefitPayableItem.remainingYears = calculateRemainingYears(accumulateLimitList);

        const accumulateLimit = getAccumulateLimitItem(accumulateLimitList);
        accidentBenefitPayableItem.limitCode = accumulateLimit.limitCode;

        // 遍历 赋值
        lodash.forEach(accumulateLimitList, (item) => {
          const { limitCode, limitValue, accumulateValue } = item;
          switch (limitCode) {
            case BenefitLimitCode.AMOUNT_PER_WEEK:
              accidentBenefitPayableItem.amountPerWeek = limitValue;
              break;
            case BenefitLimitCode.SA_PERCENTAGE_PER_WEEK:
              accidentBenefitPayableItem.saPercentagePerWeek = limitValue;
              break;
            case BenefitLimitCode.SA_PERCENTAGE:
              accidentBenefitPayableItem.saPercentage = limitValue;
              break;
            case BenefitLimitCode.SA_PERCENTAGE_PER_YEAR:
              accidentBenefitPayableItem.saPercentagePerYear = limitValue;
              break;
            case BenefitLimitCode.AMOUNT_PER_WEEK_LIMIT:
              accidentBenefitPayableItem.maxAmountPerWeek = limitValue;
              break;
            case BenefitLimitCode.AMOUNT_PER_LIFETIME_LIMIT:
              accidentBenefitPayableItem.maxAmountPerLifetime = limitValue;
              break;
            case BenefitLimitCode.SA_PERCENTAGE_PER_DISABILITY:
              accidentBenefitPayableItem.saPercentagePerDisability = limitValue;
              accidentBenefitPayableItem.accumulatedAmount = accumulateValue;
              break;
            default:
              break;
          }
        });
      }
      if (
        lodash.has(changedFields, 'payableDays') ||
        lodash.has(changedFields, 'payableYears') ||
        lodash.has(changedFields, 'benefitItemCode') ||
        lodash.has(changedFields, 'saPercentage') ||
        lodash.has(changedFields, 'saPercentagePerDisability')
      ) {
        const treatmentPayableItem = lodash.get(
          draftState,
          `claimEntities.treatmentPayableListMap.${accidentBenefitPayableItem.treatmentPayableId}`
        );
        const { benefitAmount } = treatmentPayableItem;

        accidentBenefitPayableItem.systemCalculationAmount = calculationAmount(
          accidentBenefitPayableItem,
          benefitAmount
        );
        accidentBenefitPayableItem.payableAmount = changePayableAmount(accidentBenefitPayableItem);
      }

      if (lodash.has(changedFields, 'assessorOverrideAmount')) {
        accidentBenefitPayableItem.payableAmount = changePayableAmount(accidentBenefitPayableItem);
      }
    }
  });
  return { ...nextState };
};

export default saveAccidentBenefitPayableItem;
