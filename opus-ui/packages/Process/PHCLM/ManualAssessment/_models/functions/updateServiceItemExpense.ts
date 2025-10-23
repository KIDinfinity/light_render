import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import { add, subtract } from '@/utils/precisionUtils';

const updateServiceItemExpense = ({ draftState, serviceItemId }: any) => {
  const feeItemList = draftState.claimEntities?.serviceItemListMap[serviceItemId]?.feeItemList;
  const feeItemListMap = draftState.claimEntities.feeItemListMap;
  const newExpense = lodash.reduce(
    feeItemList,
    (sum, item: any) => {
      return add(sum, formUtils.queryValue(feeItemListMap?.[item]?.feeAmount) || 0);
    },
    0
  );

  draftState.claimEntities.serviceItemListMap[serviceItemId].expense = lodash.isNumber(newExpense)
    ? newExpense
    : formUtils.queryValue(
        draftState.claimEntities?.serviceItemListMap?.[serviceItemId]?.expense
      ) || 0;
};

const updateAmount = ({ targetField, value, draftState, serviceItemId, invoiceId }: any) => {
  draftState.claimEntities.serviceItemListMap[serviceItemId][targetField] = value;
  let totalAmount = 0;
  lodash.map(draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList, (serviceId) => {
    const targetValue = draftState.claimEntities?.serviceItemListMap?.[serviceId]?.[targetField];
    if (!valueIsEmpty(targetValue)) {
      totalAmount = add(totalAmount, formUtils.queryValue(targetValue));
    }
  });

  draftState.claimEntities.invoiceListMap[invoiceId][targetField] = totalAmount;
  return totalAmount;
};

const updateNetExpense = ({ draftState, serviceItemId }: any) => {
  const { expense, otherInsurerPaidAmount } = draftState.claimEntities?.serviceItemListMap?.[
    serviceItemId
  ];
  draftState.claimEntities.serviceItemListMap[serviceItemId].netExpense = lodash.isNumber(
    formUtils.queryValue(otherInsurerPaidAmount)
  )
    ? subtract(formUtils.queryValue(expense), formUtils.queryValue(otherInsurerPaidAmount))
    : formUtils.queryValue(expense);
};

export { updateServiceItemExpense, updateAmount, updateNetExpense };
