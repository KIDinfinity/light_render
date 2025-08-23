import { produce }  from 'immer';
import lodash from 'lodash';
import type { IServiceItem } from '@/dtos/claim';

const addServiceItems = (state: any, action: any) => {
  const { invoiceId, serviceItems } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const invoiceItem = draftState.claimEntities.invoiceListMap[invoiceId];
    const serviceItemsExist = lodash.compact(
      lodash
        .values(draftState.claimEntities.serviceItemListMap)
        .map((item: IServiceItem) => item.serviceItem)
    );

    serviceItems.forEach((item: IServiceItem) => {
      if (!serviceItemsExist.includes(item.serviceItem)) {
        invoiceItem.serviceItemList = [...lodash.compact(invoiceItem.serviceItemList), item.id];
        draftState.claimEntities.serviceItemListMap[item.id] = item;
      }
    });
  });

  return { ...nextState };
};

export default addServiceItems;
