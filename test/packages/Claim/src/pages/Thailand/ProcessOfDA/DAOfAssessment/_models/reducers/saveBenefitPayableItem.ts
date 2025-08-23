import { produce } from 'immer';
import lodash from 'lodash';
import type { IBenefitItemPayable } from '@/dtos/claim';
import { subtract } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import Ienum from 'claim/enum';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { valueIsEmpty } from '@/utils/claimUtils';
import { add } from '@/utils/precisionUtils';
import { getMappingPolicyData } from '../functions/utils';

const updateAmount = ({
  targetField,
  value,
  draftState,
  benefitPayableItemId,
  invoicePayableId,
}: any) => {
  draftState.claimEntities.benefitItemPayableListMap[benefitPayableItemId][targetField] = value;
  let totalAmount = 0;
  lodash.map(
    draftState.claimEntities.invoicePayableListMap[invoicePayableId]?.benefitItemPayableList,
    (id) => {
      const targetValue = draftState.claimEntities?.benefitItemPayableListMap?.[id]?.[targetField];
      if (!valueIsEmpty(targetValue)) {
        totalAmount = add(totalAmount, formUtils.queryValue(targetValue));
      }
    }
  );

  draftState.claimEntities.invoicePayableListMap[invoicePayableId][targetField] = totalAmount;
  draftState.claimEntities.benefitItemPayableListMap[benefitPayableItemId].deductibleAmount = add(
    draftState.claimEntities.benefitItemPayableListMap[benefitPayableItemId]
      ?.deductibleOtherInsurerDeduction || 0,
    draftState.claimEntities.benefitItemPayableListMap[benefitPayableItemId]
      ?.deductibleNetExpense || 0
  );

  return totalAmount;
};
const saveBenefitPayableItem = (state: any, action: any) => {
  const { changedFields, benefitPayableItemId, invoicePayableId, showSavingAmount } =
    action.payload;
  const nextState = produce(state, (draftState: any) => {
    const benefitPayableList = draftState.claimEntities.benefitItemPayableListMap;
    const benefitPayableTemp = benefitPayableList[benefitPayableItemId];

    const temp: IBenefitItemPayable = {
      ...benefitPayableTemp,
      ...changedFields,
      operation:
        benefitPayableTemp?.manualAdd === SwitchEnum.YES ? Ienum.Operation.A : Ienum.Operation.M,
    };

    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'assessorOverrideAmount')) {
        // 当前为系统理算出来的benefit payable item，且用户输入的override amount值存在
        // 更新payable amount以及uncover amount
        const assessorOverrideAmount = formUtils.queryValue(temp.assessorOverrideAmount);
        if (lodash.isNumber(assessorOverrideAmount)) {
          temp.payableAmount = assessorOverrideAmount;
        } else {
          temp.payableAmount = temp.systemCalculationAmount;
        }
        if (!temp.isAdd) {
          const calculationAmount = Number(formUtils.queryValue(temp.calculationAmount));
          const uncoverAmount = Number(
            subtract(calculationAmount, formUtils.queryValue(temp.payableAmount))
          );
          temp.uncoverAmount = uncoverAmount > 0 ? uncoverAmount : 0;
        }
        temp.payableAmountBeforeDeductible = add(
          temp?.payableAmount || 0,
          temp?.deductibleNetExpense || 0
        );
        const savingAmount = subtract(
          temp.systemCalculationAmount,
          changedFields[Object.keys(changedFields)[0]].value
        );
        temp.savingAmount =
          !showSavingAmount || !lodash.isNumber(assessorOverrideAmount) ? null : savingAmount;
        updateAmount({
          targetField: 'payableAmountBeforeDeductible',
          value: temp?.payableAmountBeforeDeductible || 0,
          draftState,
          benefitPayableItemId,
          invoicePayableId,
        });
      }

      if (lodash.has(changedFields, 'calculationAmount')) {
        if (!temp.isAdd) {
          const calculationAmount = Number(formUtils.queryValue(temp.calculationAmount));
          const uncoverAmount = Number(
            subtract(calculationAmount, formUtils.queryValue(temp.payableAmount))
          );
          temp.uncoverAmount = uncoverAmount > 0 ? uncoverAmount : 0;
        }
      }
      if (
        lodash.has(changedFields, 'deductibleNetExpense') ||
        lodash.has(changedFields, 'deductibleOtherInsurerDeduction')
      ) {
        updateAmount({
          targetField: Object.keys(changedFields)[0],
          value: changedFields[Object.keys(changedFields)[0]].value,
          draftState,
          benefitPayableItemId,
          invoicePayableId,
        });
      }
      if (lodash.has(changedFields, 'benefitItemCode')) {
        const { productPlan }: any =
          getMappingPolicyData({
            item: temp,
            listPolicy: draftState.listPolicy,
          }) || {};
        temp.productPlan = productPlan;
      }
    }

    benefitPayableList[benefitPayableItemId] = temp;
  });
  return { ...nextState };
};

export default saveBenefitPayableItem;
