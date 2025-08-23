import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';

const serviceDelete = (state: any, action: any) => {
  const { invoiceId, treatmentId, serviceItemId } = action.payload;
  const newServiceList =
    lodash.filter(
      state.claimEntities.invoiceListMap[invoiceId].serviceItemList,
      (item) => item !== serviceItemId
    ) || [];

  const nextState = produce(state, (draftState: any) => {
    const treatmentItem = draftState.claimEntities.treatmentListMap[treatmentId] || {};
    const expense = lodash
      .chain(state.claimEntities.serviceItemListMap)
      .pick(newServiceList)
      .reduce((sum, n) => {
        if (!valueIsEmpty(n.expense)) {
          return sum + formUtils.queryValue(n.expense);
        }
        return sum;
      }, 0)
      .value();

    if (lodash.isEmpty(newServiceList)) {
      delete draftState.claimEntities.invoiceListMap[invoiceId];

      draftState.claimEntities.treatmentListMap[treatmentId] = {
        ...treatmentItem,
        invoiceList: lodash.filter(treatmentItem.invoiceList, (el: any) => el !== invoiceId),
      };
    } else {
      draftState.claimEntities.invoiceListMap[invoiceId] = {
        ...draftState.claimEntities.invoiceListMap[invoiceId],
        serviceItemList: newServiceList,
        expense,
      };
    }

    delete draftState.claimEntities.serviceItemListMap[serviceItemId];
  });

  return { ...nextState };
};

export default serviceDelete;
