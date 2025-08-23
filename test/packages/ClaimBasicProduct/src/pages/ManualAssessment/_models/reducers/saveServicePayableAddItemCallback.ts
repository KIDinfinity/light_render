import { produce } from 'immer';
import lodash from 'lodash';


import { formUtils } from 'basic/components/Form';

const saveServicePayableAddItemCallback = (state: any, action: any) => {
  const { claimEntities, servicePayableAddItem } = state;

  if (!formUtils.queryValue(servicePayableAddItem.benefitTypeCode)) {
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
  const invoicePayableArray = [];
  lodash.map(invoicePayableListMapEntries, (item) => {
    if (
      item[1].treatmentId === newServicePayableAddItem.treatmentId &&
      item[1].policyNo === formUtils.queryValue(newServicePayableAddItem.policyNo) &&
      item[1].productCode === formUtils.queryValue(newServicePayableAddItem.productCode) &&
      item[1].benefitTypeCode === formUtils.queryValue(newServicePayableAddItem.benefitTypeCode)
    ) {
      invoicePayableArray.push(item[1]);
    }
  });

  // 确认invoicePayable是否有对应的定责
  if (invoicePayableArray && invoicePayableArray.length === 1) {
    const currentInvoicePayableItem = invoicePayableArray[0];
    // 确认当前新增的servicePayable是否已存在
    let curPayableIsAlreadyExist = false;
    lodash.map(currentInvoicePayableItem.serviceItemPayableList, (itemId) => {
      const serviceItemPayableItem = newClaimEntities.serviceItemPayableListMap[itemId];

      if (serviceItemPayableItem.serviceItemId === newServicePayableAddItem.serviceItemId) {
        curPayableIsAlreadyExist = true;
      }
    });

    if (!curPayableIsAlreadyExist) {
      newServicePayableAddItem.payableId = currentInvoicePayableItem.payableId;
      newServicePayableAddItem.treatmentPayableId = currentInvoicePayableItem.treatmentPayableId;
      newServicePayableAddItem.invoicePayableId = currentInvoicePayableItem.id;

      newClaimEntities.serviceItemPayableListMap[
        newServicePayableAddItem.id
      ] = newServicePayableAddItem;

      newClaimEntities.invoicePayableListMap[
        newServicePayableAddItem.invoicePayableId
      ].serviceItemPayableList = [
        ...newClaimEntities.invoicePayableListMap[newServicePayableAddItem.invoicePayableId]
          .serviceItemPayableList,
        newServicePayableAddItem.id,
      ];

      newServicePayableAddItem = null;
    } else {
      newServicePayableAddItem.benefitTypeCode = {
        ...newServicePayableAddItem.benefitTypeCode,
        errors: [
          {
            message: 'The payable benefit alredy exists.',
            field: 'benefitTypeCode',
          },
        ],
      };
    }
  }
  const nextState = produce(state, (draftState) => {
    draftState.claimEntities = newClaimEntities;
    draftState.servicePayableAddItem = newServicePayableAddItem;
  });

  return { ...nextState };
};

export default saveServicePayableAddItemCallback;
