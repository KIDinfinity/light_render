import { produce } from 'immer';
import lodash from 'lodash';

const removeServicePayableItem = (state: any, action: any) => {
  const { invoicePayableItemId, serviceItemPayableItemId } = action.payload;

  const newServicePayableList = lodash.filter(
    state.claimEntities.invoicePayableListMap[invoicePayableItemId].serviceItemPayableList,
    (item) => item !== serviceItemPayableItemId
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.invoicePayableListMap[
      invoicePayableItemId
    ].serviceItemPayableList = newServicePayableList;
    delete draftState.claimEntities.serviceItemPayableListMap[serviceItemPayableItemId];
  });

  return { ...nextState };
};

export default removeServicePayableItem;
