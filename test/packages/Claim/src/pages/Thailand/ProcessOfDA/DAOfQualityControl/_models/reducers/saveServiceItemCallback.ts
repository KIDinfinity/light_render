import { produce } from 'immer';
import { forEach } from 'lodash';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';

const saveServiceItemCallback = (state: any, action: any) => {
  const { invoiceId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const { serviceItemList } = draftState.claimEntities.invoiceListMap[invoiceId];
    let summaryOfServiceItem = null;
    forEach(serviceItemList, (serviceItemId) => {
      const { expense } = draftState.claimEntities.serviceItemListMap[serviceItemId];
      summaryOfServiceItem = add(summaryOfServiceItem, formUtils.queryValue(expense));
    });
    draftState.claimEntities.invoiceListMap[invoiceId].summaryOfServiceItem = summaryOfServiceItem;
  });
  return { ...nextState };
};

export default saveServiceItemCallback;
