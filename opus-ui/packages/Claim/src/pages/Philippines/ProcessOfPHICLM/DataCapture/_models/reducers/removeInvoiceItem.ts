import { produce } from 'immer';
import lodash from 'lodash';

const removeInvoiceItem = (state: any, action: any) => {
  const { treatmentId, invoiceId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const serviceIdList = draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList;
    draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = lodash.filter(
      draftState.claimEntities.treatmentListMap[treatmentId].invoiceList,
      (itemId) => itemId !== invoiceId
    );

    delete draftState.claimEntities.invoiceListMap[invoiceId];
    lodash.map(serviceIdList, (itemId) => {
      delete draftState.claimEntities.serviceItemListMap[itemId];
    });
  });

  return { ...nextState };
};

export default removeInvoiceItem;
