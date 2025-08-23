import { produce }  from 'immer';

const invoiceAdd = (state: any, action: any) => {
  const { treatmentId, invoiceAdd, addServiceItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    if (!draftState.claimEntities.treatmentListMap[treatmentId].invoiceList) {
      draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].invoiceList,
      invoiceAdd.id,
    ];
    draftState.claimEntities.invoiceListMap[invoiceAdd.id] = invoiceAdd;
    draftState.claimEntities.serviceItemListMap[addServiceItem.id] = addServiceItem;
  });

  return { ...nextState };
};

export default invoiceAdd;
