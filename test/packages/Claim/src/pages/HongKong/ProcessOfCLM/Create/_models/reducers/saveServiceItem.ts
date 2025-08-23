import { produce } from 'immer';
import { add } from '@/utils/precisionUtils';
import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';

const saveServiceItem = (state: any, action: any) => {
  const { serviceItemId, changedFields, invoiceId } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...state.claimEntities.serviceItemListMap[serviceItemId],
      ...changedFields,
    };
    if (lodash.has(changedFields, 'expense')) {
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
  });
  return { ...nextState };
};

export default saveServiceItem;
