import { produce } from 'immer';
import lodash from 'lodash';
import type { IBenefitItemPayable } from '@/dtos/claim';
import { subtract } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

const saveBenefitPayableItem = (state: any, action: any) => {
  const { changedFields, benefitPayableItemId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const benefitPayableList = draftState.claimEntities.benefitItemPayableListMap;
    const temp: IBenefitItemPayable = {
      ...benefitPayableList[benefitPayableItemId],
      ...changedFields,
    };
    // 当前为系统理算出来的benefit payable item，且用户输入的override amount值存在
    if (lodash.has(changedFields, 'assessorOverrideAmount')) {
      // 更新payable amount以及uncover amount
      const assessorOverrideAmount = formUtils.queryValue(temp.assessorOverrideAmount);
      if (lodash.isNumber(assessorOverrideAmount)) {
        temp.payableAmount = assessorOverrideAmount;
      } else {
        temp.payableAmount = temp.systemCalculationAmount;
      }
      if (!temp.isAdd && lodash.isNumber(temp.calculationAmount)) {
        temp.uncoverAmount = subtract(temp.calculationAmount, temp.payableAmount);
      }
    }

    benefitPayableList[benefitPayableItemId] = temp;
  });
  return { ...nextState };
};

export default saveBenefitPayableItem;
