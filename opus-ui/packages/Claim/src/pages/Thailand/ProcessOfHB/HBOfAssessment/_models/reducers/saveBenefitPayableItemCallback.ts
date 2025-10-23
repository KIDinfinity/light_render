import { produce } from 'immer';
import lodash from 'lodash';
import type { IBenefitItemPayable } from '@/dtos/claim';
// import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

// interface Count {
//   assessorOverrideAmount: number;
//   payableAmount: number;
// }

const saveBenefitPayableItemCallback = (state: any, action: any) => {
  const { changedFields, benefitPayableItemId, invoicePayableItemNextId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const benefitPayableMap = draftState.claimEntities.benefitItemPayableListMap;
    const benefitPayableList: IBenefitItemPayable[] = formUtils.cleanValidateData(
      lodash.values(benefitPayableMap)
    );
    const temp: IBenefitItemPayable = formUtils.cleanValidateData(
      benefitPayableMap[benefitPayableItemId]
    );
    // 当前为系统理算出来的benefit payable item，且用户输入的override amount值存在
    if (lodash.has(changedFields, 'assessorOverrideAmount')) {
      // const { invoicePayableId } = temp;
      // let cur = draftState.claimEntities.invoicePayableListMap[invoicePayableId];
      // const benefitPayableIds: string[] = lodash.get(cur, 'benefitItemPayableList');
      // if (cur) {
      //   // 更新invoice payable的payable amount以及assessor Override Amount
      //   let count: Count = { assessorOverrideAmount: 0, payableAmount: 0 };
      //   count = benefitPayableList
      //     .filter((item: IBenefitItemPayable) => benefitPayableIds.includes(item.id))
      //     .reduce((result: Count, item: IBenefitItemPayable) => {
      //       result.assessorOverrideAmount = add(
      //         result.assessorOverrideAmount,
      //         item.assessorOverrideAmount
      //       );
      //       result.payableAmount = add(result.payableAmount, item.payableAmount);
      //       return result;
      //     }, count);
      //   draftState.claimEntities.invoicePayableListMap[invoicePayableId] = { ...cur, ...count };
      // }

      // 更新下一个benefit payable item的bill amount的值（若存在相同的benefit payable item的话）
      if (!temp.isAdd && invoicePayableItemNextId) {
        const invoicePayableNext =
          draftState.claimEntities.invoicePayableListMap[invoicePayableItemNextId];
        const benefitPayableNextIds: string[] =
          lodash.get(invoicePayableNext, 'benefitItemPayableList') || [];
        const benefitPayableNext: IBenefitItemPayable = benefitPayableList.filter(
          (item: IBenefitItemPayable) =>
            benefitPayableNextIds.includes(item.id) && temp.benefitItemCode === item.benefitItemCode
        )[0];
        if (benefitPayableNext) {
          benefitPayableNext.calculationAmount = temp.uncoverAmount;
          draftState.claimEntities.benefitItemPayableListMap[
            benefitPayableNext.id
          ] = benefitPayableNext;
        }
      }
    }
  });

  return { ...nextState };
};

export default saveBenefitPayableItemCallback;
