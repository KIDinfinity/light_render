import { produce } from 'immer';

const addTreatmentItem = (state: any, { payload }: any) => {
  const { incidentId, addTreatmentItem, addInvoiceItem, addServiceItem } = payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
      draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
    }
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
      ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
      addTreatmentItem.id,
    ];

    draftState.claimEntities.treatmentListMap[addTreatmentItem.id] = addTreatmentItem;
    draftState.claimEntities.invoiceListMap[addInvoiceItem.id] = addInvoiceItem;
    draftState.claimEntities.serviceItemListMap[addServiceItem.id] = addServiceItem;
  });

  return { ...nextState };
};

export default addTreatmentItem;
