import { produce } from 'immer';

const addTreatmentItem = (state: any, action: any) => {
  const { incidentId, addTreatmentItem, addInvoiceItem, addServiceItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
      draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
    }
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
      ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
      addTreatmentItem.id,
    ];
    draftState.claimEntities.treatmentListMap[addTreatmentItem.id] = addTreatmentItem;
    draftState.claimEntities.invoiceListMap[addInvoiceItem.id] = addInvoiceItem;
    // draftState.claimEntities.serviceItemListMap[addServiceItem.id] = addServiceItem;
  });

  return { ...nextState };
};

export default addTreatmentItem;
