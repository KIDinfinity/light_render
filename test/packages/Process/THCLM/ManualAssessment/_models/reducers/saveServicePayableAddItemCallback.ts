import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';

const saveServicePayableAddItemCallback = (state: any) => {
  const { claimEntities, servicePayableAddItem } = state;

  if (!formUtils.queryValue(servicePayableAddItem?.benefitTypeCode)) {
    return {
      ...state,
    };
  }
  const newClaimEntities = lodash.cloneDeep(claimEntities);
  let newServicePayableAddItem = { ...servicePayableAddItem };
  const invoicePayableListMapEntries = Object.entries(
    formUtils.cleanValidateData(newClaimEntities.invoicePayableListMap)
  );
  // 遍历treatmentPayableListMap所有的treatmentPayable
  const invoicePayableArray: any = [];
  const editPayable = formUtils.cleanValidateData(newServicePayableAddItem);
  lodash.map(invoicePayableListMapEntries, (item: any) => {
    const mapPayable =
      item[1].treatmentId === newServicePayableAddItem.treatmentId &&
      filterDuplicatePayable(item[1], editPayable);

    if (mapPayable) {
      invoicePayableArray.push(item[1]);
    }
  });

  // 确认invoicePayable是否有对应的定责
  if (invoicePayableArray && invoicePayableArray.length === 1) {
    const currentInvoicePayableItem = invoicePayableArray[0];

    newServicePayableAddItem.payableId = currentInvoicePayableItem.payableId;
    newServicePayableAddItem.treatmentPayableId = currentInvoicePayableItem.treatmentPayableId;
    newServicePayableAddItem.invoicePayableId = currentInvoicePayableItem.id;

    newClaimEntities.serviceItemPayableListMap[newServicePayableAddItem.id] =
      newServicePayableAddItem;

    newClaimEntities.invoicePayableListMap[
      newServicePayableAddItem.invoicePayableId
    ].serviceItemPayableList = [
      ...newClaimEntities.invoicePayableListMap[newServicePayableAddItem.invoicePayableId]
        .serviceItemPayableList,
      newServicePayableAddItem.id,
    ];
    newServicePayableAddItem = null;
  }
  const nextState = produce(state, (draftState) => {
    draftState.claimEntities = newClaimEntities;
    draftState.servicePayableAddItem = newServicePayableAddItem;
  });
  return { ...nextState };
};

export default saveServicePayableAddItemCallback;
