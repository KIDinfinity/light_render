import { produce } from 'immer';

const addInvoiceItem = (state: any, action: any) => {
  const { treatmentId, addInvoiceItem, addServiceItem } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    if (!draftState.claimEntities.treatmentListMap[treatmentId].invoiceList) {
      draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].invoiceList,
      addInvoiceItem.id,
    ];
    draftState.claimEntities.invoiceListMap[addInvoiceItem.id] = addInvoiceItem;
    draftState.claimEntities.serviceItemListMap[addServiceItem.id] = addServiceItem;
  });

  return { ...nextState };
};

export default addInvoiceItem;
