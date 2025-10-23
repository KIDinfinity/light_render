import { produce } from 'immer';

const addServiceItem = (state: any, action: any) => {
  const { invoiceId, addServiceItem } = action.payload;
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    if (!draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList) {
      draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList = [];
    }
    draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList = [
      ...draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList,
      addServiceItem.id,
    ];
    draftState.claimEntities.serviceItemListMap[addServiceItem.id] = addServiceItem;
  });

  return { ...nextState };
};

export default addServiceItem;
