import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { INVOICEPAYABLEITEM, SERVICEPAYABLEITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import { BenefitCategory } from 'claim/pages/utils/claim';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';

const saveTreatmentPayableAddItemCallback = (state: any) => {
  const { claimEntities, treatmentPayableAddItem, invoicePayableAddItem } = state;
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
  const incidentPayableArray: any = [];
  const editPayable = formUtils.cleanValidateData(newTreatmentPayableAddItem);
  const newPayableAddItem = { ...invoicePayableAddItem };
  const newInvoicePayableAddItem = formUtils.cleanValidateData(newPayableAddItem);

  lodash.map(claimPayableListEntries, (item: any) => {
    const mapPayable =
      item[1].incidentId === newTreatmentPayableAddItem.incidentId &&
      filterDuplicatePayable(item[1], editPayable);
    if (mapPayable) {
      incidentPayableArray.push(item[1]);
    }
  });
  // 如果当前的保单过滤后只有一条incidentPayable数据
  if (incidentPayableArray && incidentPayableArray.length === 1) {
    const currentIncidentPayableItem = incidentPayableArray[0];
    let curPayableIsAlreadyExist = false;
    lodash.map(currentIncidentPayableItem.treatmentPayableList, (itemId) => {
      const treatmentPayableItem = newClaimEntities.treatmentPayableListMap[itemId];
      const incidentPayableItem =
        newClaimEntities.claimPayableListMap[treatmentPayableItem.payableId];
      treatmentPayableItem.benefitCategory = incidentPayableItem?.benefitCategory;
      if (
        treatmentPayableItem.treatmentId === newTreatmentPayableAddItem.treatmentId &&
        treatmentPayableItem.benefitCategory === BenefitCategory.reimbursement
      ) {
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
      let invoicePayableList: any = [];
      const treatmentItem = newClaimEntities.treatmentListMap[treatmentId];
      if (benefitCategory === BenefitCategory.cashless) {
        newTreatmentPayableAddItem.benefitAmount = 0;
      }
      if (
        benefitCategory === BenefitCategory.reimbursement &&
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

          // 遍历invoicePayableListMap所有的invoicePayable
          const invoicePayableArray: any = [];
          const invoicePayableListMapEntries = Object.entries(
            formUtils.cleanValidateData(newClaimEntities.invoicePayableListMap)
          );
          if (!newInvoicePayableAddItem) {
            lodash.map(invoicePayableListMapEntries, (item) => {
              if (
                item[1].treatmentId === editPayable.treatmentId &&
                filterDuplicatePayable(item[1], editPayable)
              ) {
                invoicePayableArray.push(item[1]);
              }
            });
          }
          if (
            newInvoicePayableAddItem &&
            newInvoicePayableAddItem.treatmentId === newTreatmentPayableAddItem.treatmentId &&
            filterDuplicatePayable(newInvoicePayableAddItem, editPayable)
          ) {
            invoicePayableArray.push(newInvoicePayableAddItem);
          }
          // 确认当前新增的invoicePayable是否已存在
          if (invoicePayableArray.length > 0) {
            newPayableAddItem.benefitTypeCode = {
              ...newPayableAddItem.benefitTypeCode,
              errors: [
                {
                  message: 'The payable benefit alredy exists.',
                  field: 'benefitTypeCode',
                },
              ],
            };
          }

          let serviceItemPayableList: any = [];
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
              newClaimEntities.serviceItemPayableListMap[serviceItemPayableItem.id] =
                serviceItemPayableItem;
              return serviceItemPayableItem.id;
            });
          }
          invoicePayableItem.serviceItemPayableList = serviceItemPayableList;
          newClaimEntities.invoicePayableListMap[invoicePayableItem.id] = invoicePayableItem;
          return invoicePayableItem.id;
        });
      }
      if (benefitCategory === BenefitCategory.aipa) {
        newTreatmentPayableAddItem.accidentBenefitPayableList = [];
      }
      newTreatmentPayableAddItem.invoicePayableList = invoicePayableList;

      newClaimEntities.claimPayableListMap[currentIncidentPayableItem.id].treatmentPayableList = [
        ...newClaimEntities.claimPayableListMap[currentIncidentPayableItem.id].treatmentPayableList,
        newTreatmentPayableAddItem.id,
      ];
      newClaimEntities.treatmentPayableListMap[newTreatmentPayableAddItem.id] =
        newTreatmentPayableAddItem;
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
    draftState.invoicePayableAddItem = newPayableAddItem;
  });

  return { ...nextState };
};

export default saveTreatmentPayableAddItemCallback;
