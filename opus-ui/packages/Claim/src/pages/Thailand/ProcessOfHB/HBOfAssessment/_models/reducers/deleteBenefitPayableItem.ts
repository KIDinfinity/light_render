import { produce } from 'immer';
import lodash from 'lodash';

const deleteBenefitPayableItem = (state: any, action: any) => {
  const { invoicePayableId, benefitPayableItemId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const invoicePayable = draftState.claimEntities.invoicePayableListMap[invoicePayableId];
    invoicePayable.benefitItemPayableList = lodash.without(
      lodash.compact(lodash.get(invoicePayable, 'benefitItemPayableList')),
      benefitPayableItemId
    );
    delete draftState.claimEntities.benefitItemPayableListMap[benefitPayableItemId];
  });

  return { ...nextState };
};

export default deleteBenefitPayableItem;
