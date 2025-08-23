import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { ServiceItemCodeForDefaultUnit } from 'claim/pages/utils/isServiceItemRequired';
import { SERVICEITEM } from '@/utils/claimConstant';

const addServiceItem = (state: any, action: any) => {
  const { invoiceId, changedValues, claimNo } = action.payload;
  const addServiceItem = {
    ...SERVICEITEM,
    id: uuidv4(),
    invoiceId,
    claimNo,
    ...changedValues,
  };
  if (lodash.includes(ServiceItemCodeForDefaultUnit, addServiceItem.serviceItem)) {
    addServiceItem.unit = 1;
  }

  const nextState = produce(state, (draftState: any) => {
    if (!draftState.claimEntities.invoiceListMap[invoiceId]?.serviceItemList) {
      draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList = [];
    }
    draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList = [
      ...draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList,
      addServiceItem.id,
    ];
    draftState.claimEntities.serviceItemListMap[addServiceItem.id] = addServiceItem;
  });

  return { ...nextState };
};

export default addServiceItem;
