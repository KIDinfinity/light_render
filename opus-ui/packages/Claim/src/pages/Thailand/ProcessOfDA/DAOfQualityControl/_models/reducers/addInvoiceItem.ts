import { produce } from 'immer';

const addInvoice = (state: any, action: any) => {
  const { treatmentId, addInvoiceItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    if (!draftState.claimEntities.treatmentListMap[treatmentId].invoiceList) {
      draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].invoiceList,
      addInvoiceItem.id,
    ];
    draftState.claimEntities.invoiceListMap[addInvoiceItem.id] = addInvoiceItem;
  });

  return { ...nextState };
};

export default addInvoice;
