import { produce } from 'immer';
import lodash from 'lodash';

const addServiceItem = (state: any, action: any) => {
  const { invoiceId, addServiceItem } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList = [
      ...lodash.compact(draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList),
      addServiceItem.id,
    ];
    draftState.claimEntities.serviceItemListMap[addServiceItem.id] = addServiceItem;
  });

  return { ...nextState };
};

export default addServiceItem;
