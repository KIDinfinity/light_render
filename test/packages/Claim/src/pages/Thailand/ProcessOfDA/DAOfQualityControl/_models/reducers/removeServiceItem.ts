import { produce } from 'immer';
import lodash from 'lodash';

const removeServiceItem = (state: any, action: any) => {
  const { invoiceId, serviceItemId } = action.payload;
  const newServiceList = lodash.filter(
    state.claimEntities.invoiceListMap[invoiceId].serviceItemList,
    (item) => item !== serviceItemId
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList = newServiceList;
    draftState.claimEntities.invoiceListMap[invoiceId] = {
      ...state.claimEntities.invoiceListMap[invoiceId],
      serviceItemList: newServiceList,
    };
    delete draftState.claimEntities.serviceItemListMap[serviceItemId];
  });

  return { ...nextState };
};

export default removeServiceItem;
