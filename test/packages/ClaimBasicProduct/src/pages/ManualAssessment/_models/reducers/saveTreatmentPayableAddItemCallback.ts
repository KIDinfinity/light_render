import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import {
  INVOICEPAYABLEITEM,
  SERVICEPAYABLEITEM,
} from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';

const saveTreatmentPayableAddItemCallback = (state: any, action: any) => {
  const { claimEntities, treatmentPayableAddItem } = state;

  if (!formUtils.queryValue(treatmentPayableAddItem.benefitTypeCode)) {
    return {
      ...state,
    };
  }
  const newClaimEntities = lodash.cloneDeep(claimEntities);
  let newTreatmentPayableAddItem = { ...treatmentPayableAddItem };
  const claimPayableListEntries = Object.entries(
    formUtils.cleanValidateData(newClaimEntities.claimPayableListMap)
  );

  const incidentPayableArray = [];
  lodash.map(claimPayableListEntries, (item) => {
    if (
      item[1].incidentId === newTreatmentPayableAddItem.incidentId &&
      item[1].policyNo === formUtils.queryValue(newTreatmentPayableAddItem.policyNo) &&
      item[1].productCode === formUtils.queryValue(newTreatmentPayableAddItem.productCode) &&
      item[1].benefitTypeCode === formUtils.queryValue(newTreatmentPayableAddItem.benefitTypeCode)
    ) {
      incidentPayableArray.push(item[1]);
    }
  });

  // 如果当前的保单过滤后只有一条incidentPayable数据
  if (incidentPayableArray && incidentPayableArray.length === 1) {
    const currentIncidentPayableItem = incidentPayableArray[0];
    let curPayableIsAlreadyExist = false;
    lodash.map(currentIncidentPayableItem.treatmentPayableList, (itemId) => {
      const treatmentPayableItem = newClaimEntities.treatmentPayableListMap[itemId];

      if (treatmentPayableItem.treatmentId === newTreatmentPayableAddItem.treatmentId) {
        curPayableIsAlreadyExist = true;
      }
    });
    if (!curPayableIsAlreadyExist) {
      newTreatmentPayableAddItem.payableId = currentIncidentPayableItem.id;
      newTreatmentPayableAddItem.benefitCategory = currentIncidentPayableItem.benefitCategory;
      const {
        claimNo,
        incidentId,
        treatmentId,
        payableId,
        policyNo,
        productCode,
        benefitTypeCode,
        benefitCategory,
      } = newTreatmentPayableAddItem;
      let invoicePayableList = [];
      const treatmentItem = newClaimEntities.treatmentListMap[treatmentId];
      if (benefitCategory === 'C') {
        newTreatmentPayableAddItem.benefitAmount = 0;
      }
      if (
        benefitCategory === 'R' &&
        lodash.isArray(treatmentItem.invoiceList) &&
        treatmentItem.invoiceList.length > 0
      ) {
        invoicePayableList = lodash.map(treatmentItem.invoiceList, (invoiceId) => {
          const invoiceItem = newClaimEntities.invoiceListMap[invoiceId];
          const invoicePayableItem = {
            ...INVOICEPAYABLEITEM,
            benefitTypeCode,
            claimNo,
            expenseAmount: invoiceItem.expense,
            id: uuidv4(),
            incidentId,
            invoiceId,
            payableId,
            policyNo,
            productCode,
            treatmentId,
            treatmentPayableId: newTreatmentPayableAddItem.id,
          };
          let serviceItemPayableList = [];
          if (
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
                invoicePayableId: invoicePayableItem.id,
                payableId,
                policyNo,
                productCode,
                serviceItem: serviceItem.serviceItem,
                serviceItemId,
                treatmentId,
                treatmentPayableId: newTreatmentPayableAddItem.id,
              };
              newClaimEntities.serviceItemPayableListMap[
                serviceItemPayableItem.id
              ] = serviceItemPayableItem;
              return serviceItemPayableItem.id;
            });
          }
          invoicePayableItem.serviceItemPayableList = serviceItemPayableList;
          newClaimEntities.invoicePayableListMap[invoicePayableItem.id] = invoicePayableItem;
          return invoicePayableItem.id;
        });
      }
      newTreatmentPayableAddItem.invoicePayableList = invoicePayableList;

      newClaimEntities.claimPayableListMap[currentIncidentPayableItem.id].treatmentPayableList = [
        ...newClaimEntities.claimPayableListMap[currentIncidentPayableItem.id].treatmentPayableList,
        newTreatmentPayableAddItem.id,
      ];
      newClaimEntities.treatmentPayableListMap[
        newTreatmentPayableAddItem.id
      ] = newTreatmentPayableAddItem;
      newTreatmentPayableAddItem = null;
    } else {
      newTreatmentPayableAddItem.benefitTypeCode = {
        ...newTreatmentPayableAddItem.benefitTypeCode,
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
    draftState.treatmentPayableAddItem = newTreatmentPayableAddItem;
  });

  return { ...nextState };
};

export default saveTreatmentPayableAddItemCallback;
