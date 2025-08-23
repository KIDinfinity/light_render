import { produce } from 'immer';
import lodash from 'lodash';
import Ienum from 'claim/enum';

const addBenefitPayableItem = (state: any, action: any) => {
  const { addBenefitPayableItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { invoicePayableId, id } = addBenefitPayableItem;
    const invoicePayable = draftState.claimEntities.invoicePayableListMap[invoicePayableId];
    invoicePayable.benefitItemPayableList = [
      ...lodash.compact(lodash.get(invoicePayable, 'benefitItemPayableList')),
      id,
    ];

    draftState.claimEntities.benefitItemPayableListMap[id] = {
      ...addBenefitPayableItem,
      operation: Ienum.Operation.A,
    };
  });

  return { ...nextState };
};

export default addBenefitPayableItem;
