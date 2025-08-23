import { produce } from 'immer';
import { divide } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
// import { valueIsEmpty } from '@/utils/claimUtils';

const saveServiceItem = (state: any, action: any) => {
  const { serviceItemId, changedFields, invoiceId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    let expensePerUnit = 1;
    const temp = {
      ...state.claimEntities.serviceItemListMap[serviceItemId],
      ...changedFields,
    };
    const expense = formUtils.queryValue(temp.expense);
    const unit = formUtils.queryValue(temp.unit);
    if (
      (lodash.has(changedFields, 'expense') || lodash.has(changedFields, 'unit')) &&
      lodash.isNumber(expense) &&
      lodash.isNumber(unit)
    ) {
      expensePerUnit = divide(expense, unit);
    }

    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...state.claimEntities.serviceItemListMap[serviceItemId],
      ...changedFields,
      expensePerUnit,
    };
    // if (lodash.has(changedFields, 'unit')) {
    //   let totalExpense = 0;
    //   lodash.map(draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList, serviceId => {
    //     const expense = draftState.claimEntities.serviceItemListMap[serviceId].expense;
    //     if (!valueIsEmpty(expense)) {
    //       totalExpense = add(totalExpense, expense);
    //     }
    //   });
    //   draftState.claimEntities.invoiceListMap[invoiceId].expense = totalExpense;
    // }
  });
  return { ...nextState };
};

export default saveServiceItem;
