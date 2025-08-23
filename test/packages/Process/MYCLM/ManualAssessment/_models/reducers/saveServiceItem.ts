import { produce } from 'immer';
import lodash from 'lodash';
import { add, subtract } from '@/utils/precisionUtils';
import { ServiceCode } from 'claim/pages/Enum';
import { ServiceItemCodeForDefaultUnit } from 'claim/pages/utils/isServiceItemRequired';
import { formUtils } from 'basic/components/Form';
import { valueIsEmpty } from '@/utils/claimUtils';

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

const updateNetExpense = ({ draftState, serviceItemId, changedFields }: any) => {
  const { expense, otherInsurerPaidAmount } = draftState.claimEntities?.serviceItemListMap?.[
    serviceItemId
  ];
  changedFields.netExpense = lodash.isNumber(formUtils.queryValue(otherInsurerPaidAmount))
    ? subtract(formUtils.queryValue(expense), formUtils.queryValue(otherInsurerPaidAmount))
    : formUtils.queryValue(expense);
};

const saveServiceItem = (state: any, action: any) => {
  const { serviceItemId, changedFields, invoiceId } = action.payload;

  const nextState = produce(state, (draftState) => {
    if (lodash.size(changedFields) === 1) {
      if (
        lodash.has(changedFields, 'expense') ||
        lodash.has(changedFields, 'otherInsurerPaidAmount')
      ) {
        updateAmount({
          targetField: Object.keys(changedFields)[0],
          value: changedFields[Object.keys(changedFields)[0]].value,
          draftState,
          serviceItemId,
          invoiceId,
        });
        updateNetExpense({
          draftState,
          serviceItemId,
          changedFields,
        });
      }

      if (lodash.has(changedFields, 'serviceItem')) {
        const serviceItem = formUtils.queryValue(
          state.claimEntities?.serviceItemListMap?.[serviceItemId]?.serviceItem
        );
        const serviceCodeList = [ServiceCode.code, ServiceCode.code2];

        if (
          lodash.includes(serviceCodeList, serviceItem) &&
          !lodash.includes(serviceCodeList, changedFields.serviceItem.value)
        ) {
          changedFields.surgeryClass = '';
        }

        if (changedFields.serviceItem.value === ServiceCode['12.0.0']) {
          changedFields.expense = null;
          changedFields.netExpense = null;
          updateAmount({
            targetField: 'expense',
            value: null,
            draftState,
            serviceItemId,
            invoiceId,
          });
        } else {
          changedFields.vatExpense = null;
        }

        if (lodash.includes(ServiceItemCodeForDefaultUnit, changedFields.serviceItem.value)) {
          changedFields.unit =
            formUtils.queryValue(
              draftState.claimEntities?.serviceItemListMap?.[serviceItemId]?.unit
            ) || 1;
        }
      }
    }

    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...(state.claimEntities?.serviceItemListMap?.[serviceItemId] || {}),
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveServiceItem;
