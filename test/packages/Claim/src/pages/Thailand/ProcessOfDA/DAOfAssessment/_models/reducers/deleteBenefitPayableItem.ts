import { produce } from 'immer';
import lodash from 'lodash';
import Ienum from 'claim/enum';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';
import { add } from '@/utils/precisionUtils';

const updateAmount = ({ newList, payableListMap, targetFields }: any) => {
  return lodash.reduce(
    targetFields,
    (targerObj, targetField) => {
      return {
        ...targerObj,
        [targetField]: lodash
          .chain(payableListMap)
          .pick(newList)
          .reduce((sum, n) => {
            if (!valueIsEmpty(n[targetField])) {
              return add(sum, formUtils.queryValue(n[targetField]));
            }
            return sum;
          }, 0)
          .value(),
      };
    },
    {}
  );
};

const deleteBenefitPayableItem = (state: any, action: any) => {
  const { invoicePayableId, benefitPayableItemId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const invoicePayable = draftState.claimEntities.invoicePayableListMap[invoicePayableId];
    invoicePayable.benefitItemPayableList = lodash.without(
      lodash.compact(lodash.get(invoicePayable, 'benefitItemPayableList')),
      benefitPayableItemId
    );
    delete draftState.claimEntities.benefitItemPayableListMap[benefitPayableItemId];

    const changeBenefitItem = lodash.get(
      draftState,
      `claimProcessData.hasChangeSection.benefitItemPayableListMap.${benefitPayableItemId}`
    );

    const changeData = updateAmount({
      newList: invoicePayable.benefitItemPayableList,
      payableListMap: draftState.claimEntities.benefitItemPayableListMap,
      targetFields: ['payableAmountBeforeDeductible'],
    });

    draftState.claimEntities.invoicePayableListMap[invoicePayableId] = {
      ...(draftState.claimEntities.invoicePayableListMap[invoicePayableId] || {}),
      ...changeData,
    };

    lodash.set(
      draftState,
      `claimProcessData.hasChangeSection.benefitItemPayableListMap.${benefitPayableItemId}`,
      { ...changeBenefitItem, operation: Ienum.Operation.D }
    );
  });

  return { ...nextState };
};

export default deleteBenefitPayableItem;
