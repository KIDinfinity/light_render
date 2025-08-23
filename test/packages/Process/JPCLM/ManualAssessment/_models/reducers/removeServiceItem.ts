import { produce }  from 'immer';

import lodash from 'lodash';

import removeInvoiceItem from './removeInvoiceItem';

const serviceDelete = (state: any, action: any) => {
  const { invoiceId, serviceItemId, treatmentId } = action.payload;

  const newServiceList =
    lodash.filter(
      state.claimEntities.invoiceListMap[invoiceId].serviceItemList,
      (item) => item !== serviceItemId
    ) || [];

  const nextState = produce(state, (draftState) => {
    delete draftState.claimEntities.serviceItemListMap[serviceItemId];
  });

  const newState = removeInvoiceItem(nextState, {
    type: 'removeInvoiceItem',
    payload: {
      newServiceList,
      treatmentId,
      invoiceId,
    },
  });
  return { ...newState };
};

export default serviceDelete;
