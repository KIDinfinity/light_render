import { produce } from 'immer';
import { multiply, add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';

const saveServiceItem = (state: any, action: any) => {
  const { serviceItemId, changedFields, invoiceId } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...state.claimEntities.serviceItemListMap[serviceItemId],
      ...changedFields,
    };

    if (lodash.has(changedFields, 'expensePerUnit') || lodash.has(changedFields, 'unit')) {
      draftState.claimEntities.serviceItemListMap[serviceItemId].expense = multiply(
        formUtils.queryValue(
          draftState.claimEntities.serviceItemListMap[serviceItemId].expensePerUnit
        ),
        formUtils.queryValue(draftState.claimEntities.serviceItemListMap[serviceItemId].unit)
      );
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
