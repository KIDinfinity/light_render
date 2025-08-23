import { produce } from 'immer';
import { divide } from '@/utils/precisionUtils';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';
import { add } from '@/utils/precisionUtils';

const updateAmount = ({ targetField, value, draftState, serviceItemId, invoiceId }: any) => {
  draftState.claimEntities.serviceItemListMap[serviceItemId][targetField] = value;
  let totalAmount = 0;
  lodash.map(draftState.claimEntities.invoiceListMap[invoiceId]?.serviceItemList, (serviceId) => {
    const targetValue = draftState.claimEntities?.serviceItemListMap?.[serviceId]?.[targetField];
    if (!valueIsEmpty(targetValue)) {
      totalAmount = add(totalAmount, formUtils.queryValue(targetValue));
    }
  });

  draftState.claimEntities.invoiceListMap[invoiceId][targetField] = totalAmount;
  return totalAmount;
};

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

    if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'otherInsurerPaidAmount')) {
      updateAmount({
        targetField: Object.keys(changedFields)[0],
        value: changedFields[Object.keys(changedFields)[0]].value,
        draftState,
        serviceItemId,
        invoiceId,
      });
    }

    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...state.claimEntities.serviceItemListMap[serviceItemId],
      ...changedFields,
      expensePerUnit,
    };
  });
  return { ...nextState };
};

export default saveServiceItem;
