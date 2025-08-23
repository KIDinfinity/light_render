import { produce }  from 'immer';
import { add } from '@/utils/precisionUtils';
import { ServiceCode } from 'claim/pages/Enum';
import { ServiceItemCodeForDefaultUnit } from 'claim/pages/utils/isServiceItemRequired';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { valueIsEmpty } from '@/utils/claimUtils';

const updateAmount = ({ targetField, value, draftState, serviceItemId, invoiceId }: any) => {
  draftState.claimEntities.serviceItemListMap[serviceItemId][targetField] = value;
  let totalAmount = 0;
  lodash.map(draftState.claimEntities.invoiceListMap[invoiceId].serviceItemList, (serviceId) => {
    const targetValue = draftState.claimEntities.serviceItemListMap[serviceId][targetField];
    if (!valueIsEmpty(targetValue)) {
      totalAmount = add(totalAmount, formUtils.queryValue(targetValue));
    }
  });

  draftState.claimEntities.invoiceListMap[invoiceId][targetField] = totalAmount;
  return totalAmount;
};

const saveServiceItem = (state: any, action: any) => {
  const { serviceItemId, changedFields, invoiceId } = action.payload;

  const nextState = produce(state, (draftState) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'expense')) {
        updateAmount({
          targetField: 'expense',
          value: changedFields.expense.value,
          draftState,
          serviceItemId,
          invoiceId,
        });
      }
      if (lodash.has(changedFields, 'otherInsurerPaidAmount')) {
        const otherInsurerPaidAmountAmount = updateAmount({
          targetField: 'otherInsurerPaidAmount',
          value: changedFields.otherInsurerPaidAmount.value,
          draftState,
          serviceItemId,
          invoiceId,
        });
        const treatmentId = draftState.claimEntities?.invoiceListMap?.[invoiceId]?.treatmentId;
        draftState.claimEntities.treatmentListMap[treatmentId].isClaimWithOtherInsurer =
          otherInsurerPaidAmountAmount > 0 ? 1 : 0;
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
        if (lodash.includes(ServiceItemCodeForDefaultUnit, changedFields.serviceItem.value)) {
          changedFields.unit =
            formUtils.queryValue(
              draftState.claimEntities.serviceItemListMap[serviceItemId]?.unit
            ) || 1;
        }
      }
    }

    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...state.claimEntities.serviceItemListMap[serviceItemId],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default saveServiceItem;
