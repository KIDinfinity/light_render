import { produce }  from 'immer';

const treatmentAdd = (state: any, action: any) => {
  const { incidentId, treatmentAdd, invoiceAdd, addServiceItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    if (!draftState.claimEntities.incidentListMap[incidentId].treatmentList) {
      draftState.claimEntities.incidentListMap[incidentId].treatmentList = [];
    }
    draftState.claimEntities.incidentListMap[incidentId].treatmentList = [
      ...draftState.claimEntities.incidentListMap[incidentId].treatmentList,
      treatmentAdd.id,
    ];
    draftState.claimEntities.treatmentListMap[treatmentAdd.id] = treatmentAdd;
    if (invoiceAdd || addServiceItem) {
      draftState.claimEntities.invoiceListMap[invoiceAdd?.id] = invoiceAdd;
      draftState.claimEntities.serviceItemListMap[addServiceItem?.id] = addServiceItem;
    }
  });

  return { ...nextState };
};

export default treatmentAdd;
