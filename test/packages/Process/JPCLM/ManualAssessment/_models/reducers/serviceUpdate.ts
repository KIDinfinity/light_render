import { produce }  from 'immer';
import { add } from '@/utils/precisionUtils';
import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';
import links from '../links';

const serviceUpdate = (state: any, action: any) => {
  const { serviceItemId, changedFields, invoiceId } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...state.claimEntities.serviceItemListMap[serviceItemId],
      ...changedFields,
    };

    if (lodash.has(changedFields, 'expense') && lodash.size(changedFields) === 1) {
      draftState.claimEntities.serviceItemListMap[serviceItemId].expense =
        changedFields.expense.value;
      let totalExpense = 0;
      lodash.map(
        draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList,
        (serviceId) => {
          const { expense } = draftState.claimEntities.serviceItemListMap[serviceId];
          if (!valueIsEmpty(expense)) {
            totalExpense = add(totalExpense, expense);
          }
        }
      );
      draftState.claimEntities.invoiceListMap[invoiceId].expense = totalExpense;
    }

    if (lodash.size(changedFields) === 1) {
      links.serviceItem_medicalProvider({ draftState, changedFields, serviceItemId });
      links.serviceItem_fromDate({ draftState, changedFields, serviceItemId });
    }
  });

  return { ...nextState };
};

export default serviceUpdate;
