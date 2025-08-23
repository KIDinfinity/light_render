import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { SERVICEPAYABLEITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';

const saveInvoicePayableAddItemCallback = (state: any) => {
  const { claimEntities, invoicePayableAddItem } = state;

  if (!formUtils.queryValue(invoicePayableAddItem.benefitTypeCode)) {
    return {
      ...state,
    };
  }
  const newClaimEntities = lodash.cloneDeep(claimEntities);
  let newInvoicePayableAddItem = { ...invoicePayableAddItem };
  const treatmentPayableListMapEntries = Object.entries(
    formUtils.cleanValidateData(newClaimEntities.treatmentPayableListMap)
  );
  // 遍历treatmentPayableListMap所有的treatmentPayable
  const treatmentPayableArray = [];
  lodash.map(treatmentPayableListMapEntries, (item) => {
    if (
      item[1].treatmentId === newInvoicePayableAddItem.treatmentId &&
      item[1].policyNo === formUtils.queryValue(newInvoicePayableAddItem.policyNo) &&
      item[1].productCode === formUtils.queryValue(newInvoicePayableAddItem.productCode) &&
      item[1].benefitTypeCode === formUtils.queryValue(newInvoicePayableAddItem.benefitTypeCode)
    ) {
      treatmentPayableArray.push(item[1]);
    }
  });

  // 确认treatmentPayable是否有对应的定责
  if (treatmentPayableArray && treatmentPayableArray.length === 1) {
    const currentTreatmentPayableItem = treatmentPayableArray[0];
    // 确认当前新增的invoicePayable是否已存在
    let curPayableIsAlreadyExist = false;
    lodash.map(currentTreatmentPayableItem.invoicePayableList, (itemId) => {
      const invoicePayableItem = newClaimEntities.invoicePayableListMap[itemId];

      if (invoicePayableItem.invoiceId === newInvoicePayableAddItem.invoiceId) {
        curPayableIsAlreadyExist = true;
      }
    });

    if (!curPayableIsAlreadyExist) {
      newInvoicePayableAddItem.payableId = currentTreatmentPayableItem.payableId;
      newInvoicePayableAddItem.treatmentPayableId = currentTreatmentPayableItem.id;
      const {
        claimNo,
        incidentId,
        treatmentId,
        invoiceId,
        payableId,
        treatmentPayableId,
        policyNo,
        productCode,
        benefitTypeCode,
      } = newInvoicePayableAddItem;

      let serviceItemPayableList = [];
      const invoiceItem = newClaimEntities.invoiceListMap[invoiceId];

      // 确认当前选的保单、产品、benefitType是不是补偿型
      const claimPayableListEntries = Object.entries(
        formUtils.cleanValidateData(newClaimEntities.claimPayableListMap)
      );
      const incidentPayableArray = [];
      lodash.map(claimPayableListEntries, (item) => {
        if (
          item[1].incidentId === newInvoicePayableAddItem.incidentId &&
          item[1].policyNo === formUtils.queryValue(newInvoicePayableAddItem.policyNo) &&
          item[1].productCode === formUtils.queryValue(newInvoicePayableAddItem.productCode) &&
          item[1].benefitTypeCode === formUtils.queryValue(newInvoicePayableAddItem.benefitTypeCode)
        ) {
          incidentPayableArray.push(item[1]);
        }
      });

      // 补偿型的定责&&serviceItemList.length>0时，给新增的invoicePayable添加serviceItemPayable
      if (
        incidentPayableArray[0].benefitCategory === 'R' &&
        lodash.isArray(invoiceItem.serviceItemList) &&
        invoiceItem.serviceItemList.length > 0
      ) {
        serviceItemPayableList = lodash.map(invoiceItem.serviceItemList, (serviceItemId) => {
          const serviceItem = newClaimEntities.serviceItemListMap[serviceItemId];
          const serviceItemPayableItem = {
            ...SERVICEPAYABLEITEM,
            benefitTypeCode,
            calculationAmount: serviceItem.expense,
            claimNo,
            expenseAmount: serviceItem.expense,
            id: uuidv4(),
            incidentId,
            invoiceId,
            invoicePayableId: invoicePayableAddItem.id,
            payableId,
            policyNo,
            productCode,
            serviceItem: serviceItem.serviceItem,
            serviceItemId,
            treatmentId,
            treatmentPayableId,
          };
          newClaimEntities.serviceItemPayableListMap[
            serviceItemPayableItem.id
          ] = serviceItemPayableItem;
          return serviceItemPayableItem.id;
        });
      }
      newInvoicePayableAddItem.serviceItemPayableList = serviceItemPayableList;
      newClaimEntities.invoicePayableListMap[
        newInvoicePayableAddItem.id
      ] = newInvoicePayableAddItem;

      newClaimEntities.treatmentPayableListMap[
        newInvoicePayableAddItem.treatmentPayableId
      ].invoicePayableList = [
        ...newClaimEntities.treatmentPayableListMap[newInvoicePayableAddItem.treatmentPayableId]
          .invoicePayableList,
        newInvoicePayableAddItem.id,
      ];
      newInvoicePayableAddItem = null;
    } else {
      newInvoicePayableAddItem.benefitTypeCode = {
        ...newInvoicePayableAddItem.benefitTypeCode,
        errors: [
          {
            message: 'The payable benefit alredy exists.',
            field: 'benefitTypeCode',
          },
        ],
      };
    }
  }
  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.claimEntities = newClaimEntities;
    draftState.invoicePayableAddItem = newInvoicePayableAddItem;
  });

  return { ...nextState };
};

export default saveInvoicePayableAddItemCallback;
