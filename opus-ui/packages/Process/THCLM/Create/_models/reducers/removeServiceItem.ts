import { produce } from 'immer';
import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';

const removeServiceItem = (state: any, action: any) => {
  const { invoiceId, serviceItemId } = action.payload;
  const newServiceList = lodash.filter(
    state.claimEntities.invoiceListMap[invoiceId].serviceItemList,
    (item) => item !== serviceItemId
  );

  const nextState = produce(state, (draftState) => {
    const expense = lodash
      .chain(state.claimEntities.serviceItemListMap)
      .pick(newServiceList)
      .reduce((sum, n) => {
        if (!valueIsEmpty(n.expense)) {
          return sum + n.expense;
        }
        return sum;
      }, 0)
      .value();
    draftState.claimEntities.invoiceListMap[invoiceId] = {
      ...draftState.claimEntities.invoiceListMap[invoiceId],
      serviceItemList: newServiceList,
      expense,
    };
    delete draftState.claimEntities.serviceItemListMap[serviceItemId];
  });

  return { ...nextState };
};

export default removeServiceItem;
