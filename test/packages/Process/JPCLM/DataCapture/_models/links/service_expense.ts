import lodash from 'lodash';
import { add } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';

export default ({ draftState, changedFields, serviceItemId, invoiceId }: any) => {
  if (!lodash.has(changedFields, 'expense')) return;
  const draft = draftState;
  draft.claimEntities.serviceItemListMap[serviceItemId].expense = changedFields.expense.value;
  let totalExpense = 0;
  lodash.map(draft.claimEntities.invoiceListMap[invoiceId].serviceItemList, (serviceId) => {
    const { expense } = draft.claimEntities.serviceItemListMap[serviceId];
    if (!valueIsEmpty(expense)) {
      totalExpense = add(totalExpense, formUtils.queryValue(expense));
    }
  });

  draft.claimEntities.invoiceListMap[invoiceId].expense = totalExpense;
};
