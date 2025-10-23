import { produce } from 'immer';
import lodash from 'lodash';

const invoiceDelete = (state: any, action: any) => {
  const { treatmentId, invoiceId, serviceItemId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const serviceIdList = draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList;
    const invoiceList = draftState.claimEntities.treatmentListMap[treatmentId]?.invoiceList;
    draftState.claimEntities.treatmentListMap[treatmentId].invoiceList = lodash.filter(
      invoiceList,
      (itemId) => itemId !== invoiceId
    );

    delete draftState.claimEntities.invoiceListMap[invoiceId];

    lodash.map(serviceIdList, (itemId) => {
      delete draftState.claimEntities.serviceItemListMap[itemId];
    });
    delete draftState.claimEntities.serviceItemListMap[serviceItemId];
  });

  return { ...nextState };
};

export default invoiceDelete;
