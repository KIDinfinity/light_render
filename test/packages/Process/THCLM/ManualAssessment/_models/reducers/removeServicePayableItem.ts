import { produce }  from 'immer';
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

    if (lodash.size(newServicePayableList) === 0) {
      const treatmentPayableId =
        draftState.claimEntities.invoicePayableListMap?.[invoicePayableItemId]?.treatmentPayableId;
      const newInvoicePayableList = lodash.filter(
        draftState.claimEntities.treatmentPayableListMap?.[treatmentPayableId].invoicePayableList,
        (item) => item !== invoicePayableItemId
      );
      draftState.claimEntities.treatmentPayableListMap[
        treatmentPayableId
      ].invoicePayableList = newInvoicePayableList;
      delete draftState.claimEntities.invoicePayableListMap?.[invoicePayableItemId];
      if (lodash.size(newInvoicePayableList) === 0) {
        const payableId =
          draftState.claimEntities.treatmentPayableListMap?.[treatmentPayableId]?.payableId;
        const newTreatmentPayableList = lodash.filter(
          draftState.claimEntities.claimPayableListMap?.[payableId].treatmentPayableList,
          (item) => item !== treatmentPayableId
        );
        draftState.claimEntities.claimPayableListMap[
          payableId
        ].treatmentPayableList = newTreatmentPayableList;
        delete draftState.claimEntities.treatmentPayableListMap?.[treatmentPayableId];
        if (lodash.size(newTreatmentPayableList) === 0) {
          const newClaimPayableList = lodash.filter(
            draftState.claimProcessData.claimPayableList,
            (item) => item !== payableId
          );
          draftState.claimProcessData.claimPayableList = newClaimPayableList;
          delete draftState.claimEntities.claimPayableListMap?.[payableId];
        }
      }
    }
  });

  return { ...nextState };
};

export default removeServicePayableItem;
