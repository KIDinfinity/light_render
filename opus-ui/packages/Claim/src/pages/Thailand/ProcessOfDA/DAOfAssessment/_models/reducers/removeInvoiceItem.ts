import { produce } from 'immer';
import lodash from 'lodash';

const removeInvoiceItem = (state: any, action: any) => {
  const { treatmentId, invoiceId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const serviceIdList = draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList;
    const invoicePayableListMap = draftState.claimEntities.invoicePayableListMap;
    draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = lodash.filter(
      draftState.claimEntities.treatmentListMap[treatmentId].invoiceList,
      (itemId) => itemId !== invoiceId
    );

    delete draftState.claimEntities.invoiceListMap[invoiceId];
    lodash.map(serviceIdList, (itemId) => {
      delete draftState.claimEntities.serviceItemListMap[itemId];
    });
    lodash.map(lodash.values(invoicePayableListMap || []), (invoicePayaleItem) => {
      if (invoicePayaleItem?.invoiceId === invoiceId) {
        delete draftState.claimEntities.invoicePayableListMap[invoicePayaleItem?.id];
      }
    });
  });

  return { ...nextState };
};

export default removeInvoiceItem;
