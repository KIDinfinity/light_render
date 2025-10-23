/* eslint-disable import/no-unresolved */
import { produce } from 'immer';
import { cloneDeep, isNumber } from 'lodash';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';
import { multiply, subtract } from '@/utils/precisionUtils';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { checkTreatmentPayableDuplicate } from '../functions/claimPayableFunc';
import {
  removeTreatmentPayableItemExpectDecision,
  updateDecisionForTreatmentPayableItem,
} from '../functions/expectDecisionFunc';
import { deleteErrorMessages } from '../functions';

const shouldUpdateExpectDecision = [
  'assessorOverrideAmount',
  'assessorOverrideDays',
  'assessorOverrideMultiple',
  'assessorOverrideDeductible',
];

const saveTreatmentPayableItem = (state, action) => {
  const { changedFields, treatmentPayableItemId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const { claimProcessData, claimEntities } = draftState;
    const { treatmentPayableListMap, claimPayableListMap } = claimEntities;
    const treatmentPayableItem = treatmentPayableListMap[treatmentPayableItemId];
    const claimPayableItem = claimPayableListMap[treatmentPayableItem.payableId];
    const preTreatmentPayableItem = cloneDeep(treatmentPayableItem);
    const treatmentPayableTemp = cloneDeep(treatmentPayableListMap);
    const newTreatmentPayableItem = { ...treatmentPayableItem, ...changedFields };
    const treatmentPayableItemValue = formUtils.cleanValidateData(newTreatmentPayableItem);
    const fieldsArray = Object.entries(changedFields);
    const {
      assessorOverrideAmount,
      benefitAmount,
      systemCalculationDays,
      assessorOverrideDays,
      systemDeductibleAmount,
      assessorOverrideMultiple,
      deductibleAmount,
      assessorOverrideDeductible,
      systemCalculationAmount,
    } = treatmentPayableItemValue;
    if (fieldsArray.length === 1) {
      const [name] = fieldsArray[0];
      // 修改给付责任
      if (name === 'benefitItemCode') {
        removeTreatmentPayableItemExpectDecision(
          claimProcessData,
          claimEntities,
          preTreatmentPayableItem.id
        );
        newTreatmentPayableItem.manualAdd = SwitchEnum.YES;
        // incidentDecisions唯一性校验
        if (!checkTreatmentPayableDuplicate(treatmentPayableListMap, newTreatmentPayableItem)) {
          updateDecisionForTreatmentPayableItem(
            claimProcessData,
            claimPayableItem,
            newTreatmentPayableItem
          );
          newTreatmentPayableItem.systemCalculationAmount = 0;
          newTreatmentPayableItem.assessorOverrideAmount = null;
          newTreatmentPayableItem.remark = '';
          newTreatmentPayableItem.systemPayableDays = null;
          newTreatmentPayableItem.assessorOverrideDays = null;
          newTreatmentPayableItem.reimbursementMultiple = null;
          newTreatmentPayableItem.assessorOverrideMultiple = null;
          newTreatmentPayableItem.systemDeductibleAmount = null;
          newTreatmentPayableItem.assessorOverrideDeductible = null;
          newTreatmentPayableItem.assessorOverridePercentage = null;
          newTreatmentPayableItem.deductibleAmount = null;
          newTreatmentPayableItem.payableAmount = null;
        }

        treatmentPayableTemp[treatmentPayableItemId] = newTreatmentPayableItem;
        claimEntities.treatmentPayableListMap = deleteErrorMessages.delTreatmentPayableBenefitItem(
          treatmentPayableTemp,
          treatmentPayableItemId
        );
      }

      // 修改调整支付金额
      if (name === 'assessorOverrideAmount') {
        if (isNumber(assessorOverrideAmount)) {
          newTreatmentPayableItem.payableAmount = assessorOverrideAmount;
        } else {
          newTreatmentPayableItem.payableAmount = systemCalculationAmount;
        }
      }

      // Max amount为空
      const benefitAmountIsExist = isNumber(benefitAmount);
      // 修改调整支付日数
      if (name === 'assessorOverrideDays') {
        if (!isNumber(assessorOverrideDays)) {
          newTreatmentPayableItem.assessorOverrideAmount = null;
          newTreatmentPayableItem.payableAmount = systemCalculationAmount;
        }
        if (isNumber(assessorOverrideDays) && benefitAmountIsExist) {
          // 调整倍率不存在
          const assessorPercentageIsEmpty = valueIsEmpty(assessorOverrideMultiple);
          // 调整控除不存在
          const assessorDeductibleIsEmpty = valueIsEmpty(assessorOverrideDeductible);

          // benefitAmount存在 && 调整倍率不存在 && 调整控除不存在
          if (assessorPercentageIsEmpty && assessorDeductibleIsEmpty) {
            const payableAmount = multiply(benefitAmount, assessorOverrideDays);
            newTreatmentPayableItem.assessorOverrideAmount = payableAmount;
            newTreatmentPayableItem.payableAmount = payableAmount;
          }
        }
      }

      if (isNumber(assessorOverrideDays)) {
        newTreatmentPayableItem.payableDays = assessorOverrideDays;
      } else {
        newTreatmentPayableItem.payableDays = systemCalculationDays;
      }

      // 修改调整倍率
      if (name === 'assessorOverrideMultiple') {
        if (!isNumber(assessorOverrideMultiple)) {
          newTreatmentPayableItem.assessorOverrideAmount = null;
          newTreatmentPayableItem.payableAmount = systemCalculationAmount;
        }
        if (isNumber(assessorOverrideMultiple) && benefitAmountIsExist) {
          // 调整支付天数不存在
          const assessmentDaysIsEmpty = valueIsEmpty(assessorOverrideDays);
          // 调整控除不存在
          const assessorDeductibleIsEmpty = valueIsEmpty(assessorOverrideDeductible);

          // benefitAmount存在 && 调整支付天数不存在 && 调整控除不存在
          if (assessmentDaysIsEmpty && assessorDeductibleIsEmpty) {
            let payableAmount = multiply(benefitAmount, assessorOverrideMultiple);
            payableAmount = subtract(payableAmount, deductibleAmount);
            newTreatmentPayableItem.assessorOverrideAmount = payableAmount;
            newTreatmentPayableItem.payableAmount = payableAmount;
          }
          // benefitAmount存在 && 调整支付天数不存在 && 调整控除存在
          if (assessmentDaysIsEmpty && !assessorDeductibleIsEmpty) {
            let payableAmount = multiply(benefitAmount, assessorOverrideMultiple);
            payableAmount = subtract(payableAmount, assessorOverrideDeductible);
            newTreatmentPayableItem.assessorOverrideAmount = payableAmount;
            newTreatmentPayableItem.payableAmount = payableAmount;
          }
        }
      }

      // 修改调整控除
      if (name === 'assessorOverrideDeductible') {
        if (!isNumber(assessorOverrideDeductible)) {
          newTreatmentPayableItem.assessorOverrideAmount = null;
          newTreatmentPayableItem.payableAmount = systemCalculationAmount;
        }
        if (isNumber(assessorOverrideDeductible) && benefitAmountIsExist) {
          // 调整支付天数不存在
          const assessmentDaysIsEmpty = valueIsEmpty(assessorOverrideDays);
          // 调整控除不存在
          const assessorDeductibleIsEmpty = valueIsEmpty(assessorOverrideDeductible);

          // benefitAmount存在 && 调整支付天数不存在 && 调整控除存在
          if (assessmentDaysIsEmpty && !assessorDeductibleIsEmpty) {
            let payableAmount = multiply(benefitAmount, assessorOverrideMultiple);
            payableAmount = subtract(payableAmount, assessorOverrideDeductible);
            newTreatmentPayableItem.assessorOverrideAmount = payableAmount;
            newTreatmentPayableItem.payableAmount = payableAmount;
          }
        }
      }

      if (isNumber(assessorOverrideDeductible)) {
        newTreatmentPayableItem.deductibleAmount = assessorOverrideDeductible;
      } else {
        newTreatmentPayableItem.deductibleAmount = systemDeductibleAmount;
      }

      if (shouldUpdateExpectDecision.includes(name)) {
        updateDecisionForTreatmentPayableItem(
          claimProcessData,
          claimPayableItem,
          newTreatmentPayableItem
        );
      }
    }

    claimEntities.treatmentPayableListMap[treatmentPayableItemId] = newTreatmentPayableItem;
  });

  return { ...nextState };
};

export default saveTreatmentPayableItem;
