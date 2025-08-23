import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import {
  LIFEPAYABLE,
  TREATMENTPAYABLEITEM,
  INVOICEPAYABLEITEM,
  SERVICEPAYABLEITEM,
} from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { tenant } from '@/components/Tenant';
import { BenefitCategory, SwitchEnum } from 'claim/pages/utils/claim';
import { getExchangeRateValue, mapDefaultRateRecord } from 'claim/pages/utils/handleExchangeRate';

/**
 * 根据选择的保单、产品、类型和当前的incident生成对应的incident payable数据
 * @param {当前在修改的claimPayableListItem} claimPayableListItem
 * @param {当前在修改的claimPayableListItem对应的incidentListItem} incidentListItem
 */
export function complementClaimPayableItem(claimPayableListItem, claimEntities, exchangeRateList) {
  const editClaimPayableListItem = { ...claimPayableListItem };
  const editClaimEntities = { ...claimEntities };
  const claimEntitiesValue = formUtils.cleanValidateData(claimEntities);
  const incidentListItemValue =
    claimEntitiesValue.incidentListMap[editClaimPayableListItem.incidentId];
  const { claimNo, policyNo, productCode, benefitTypeCode, incidentId } = editClaimPayableListItem;
  const payableId = editClaimPayableListItem.id;
  const systemCurrency = tenant.currency();

  if (editClaimPayableListItem.benefitCategory === BenefitCategory.life) {
    editClaimPayableListItem.lifePayable = {
      ...LIFEPAYABLE,
      benefitTypeCode,
      claimNo,
      id: uuidv4(),
      incidentId,
      payableId,
      policyNo,
      productCode,
      manualAdd: SwitchEnum.YES,
    };
  }
  const { treatmentList } = incidentListItemValue;

  if (editClaimPayableListItem.benefitCategory === BenefitCategory.cashless && lodash.isArray(treatmentList)) {
    editClaimPayableListItem.treatmentPayableList = lodash.map(treatmentList, (treatmentId) => {
      const treatmentPayableItem = {
        ...TREATMENTPAYABLEITEM,
        benefitAmount: 0,
        benefitCategory: BenefitCategory.cashless,
        benefitTypeCode,
        claimNo,
        id: uuidv4(),
        incidentId,
        payableId,
        policyNo,
        productCode,
        treatmentId,
        manualAdd: SwitchEnum.YES,
        policyCurrency: editClaimPayableListItem?.policyCurrency || systemCurrency,
      };
      let expenseAmount = 0;
      const { invoiceList } = claimEntitiesValue.treatmentListMap[treatmentId];
      lodash.map(invoiceList, (invoiceId) => {
        const invoiceItem = claimEntitiesValue.invoiceListMap[invoiceId];
        expenseAmount = add(expenseAmount, invoiceItem.expense);
      });
      treatmentPayableItem.expenseAmount = expenseAmount;
      editClaimEntities.treatmentPayableListMap[treatmentPayableItem.id] = treatmentPayableItem;
      return treatmentPayableItem.id;
    });
  }

  if (editClaimPayableListItem.benefitCategory === BenefitCategory.reimbursement && lodash.isArray(treatmentList)) {
    editClaimPayableListItem.treatmentPayableList = lodash.map(treatmentList, (treatmentId) => {
      const treatmentItem = claimEntitiesValue.treatmentListMap[treatmentId];
      const treatmentPayableItem = {
        ...TREATMENTPAYABLEITEM,
        benefitCategory: BenefitCategory.reimbursement,
        benefitTypeCode,
        claimNo,
        id: uuidv4(),
        incidentId,
        payableId,
        policyNo,
        productCode,
        treatmentId,
        manualAdd: SwitchEnum.YES,
        policyCurrency: editClaimPayableListItem?.policyCurrency || systemCurrency,
      };
      let expenseAmount = 0;
      let invoicePayableList = [];
      if (lodash.isArray(treatmentItem.invoiceList) && treatmentItem.invoiceList.length > 0) {
        invoicePayableList = lodash.map(treatmentItem.invoiceList, (invoiceId) => {
          const invoiceItem = claimEntitiesValue.invoiceListMap[invoiceId];
          expenseAmount = add(expenseAmount, invoiceItem.expense);
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
            manualAdd: SwitchEnum.YES,
            treatmentPayableId: treatmentPayableItem.id,
            policyCurrency: editClaimPayableListItem?.policyCurrency || systemCurrency,
          };
          const fromCurrency = invoiceItem?.invoiceCurrency;
          const toCurrency = invoicePayableItem.policyCurrency;
          const exchangeRate = getExchangeRateValue({ exchangeRateList, toCurrency, fromCurrency });
          invoicePayableItem.exchangeRateInvoicePolicy = exchangeRate;
          invoicePayableItem.exchangeRateRecord = mapDefaultRateRecord({fromCurrency, toCurrency, exchangeRate})
          let serviceItemPayableList = [];
          if (
            lodash.isArray(invoiceItem.serviceItemList) &&
            invoiceItem.serviceItemList.length > 0
          ) {
            serviceItemPayableList = lodash.map(invoiceItem.serviceItemList, (serviceItemId) => {
              const serviceItem = claimEntitiesValue.serviceItemListMap[serviceItemId];
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
                manualAdd: SwitchEnum.YES,
                treatmentPayableId: treatmentPayableItem.id,
                policyCurrency: editClaimPayableListItem?.policyCurrency || systemCurrency,
              };
              editClaimEntities.serviceItemPayableListMap[
                serviceItemPayableItem.id
              ] = serviceItemPayableItem;
              return serviceItemPayableItem.id;
            });
          }
          invoicePayableItem.serviceItemPayableList = serviceItemPayableList;
          editClaimEntities.invoicePayableListMap[invoicePayableItem.id] = invoicePayableItem;
          return invoicePayableItem.id;
        });
      }
      treatmentPayableItem.expenseAmount = expenseAmount;
      treatmentPayableItem.invoicePayableList = invoicePayableList;
      editClaimEntities.treatmentPayableListMap[treatmentPayableItem.id] = treatmentPayableItem;
      return treatmentPayableItem.id;
    });
  }

  if (editClaimPayableListItem.benefitCategory === BenefitCategory.aipa) {
    editClaimPayableListItem.treatmentPayableList = lodash.map(treatmentList, (treatmentId) => {
      const treatmentPayableItem = {
        ...TREATMENTPAYABLEITEM,
        fullyClaim: 0,
        // benefitAmount: sumAssured,
        benefitCategory: BenefitCategory.aipa,
        accidentBenefitPayableList: [],
        benefitTypeCode,
        claimNo,
        incidentId,
        payableId,
        policyNo,
        productCode,
        id: uuidv4(),
        treatmentId,
        manualAdd: SwitchEnum.YES,
        isAdd: true,
      };
      editClaimEntities.treatmentPayableListMap[treatmentPayableItem.id] = treatmentPayableItem;
      return treatmentPayableItem.id;
    });
  }

  return { editClaimPayableListItem, editClaimEntities };
}

export default {
  complementClaimPayableItem,
};
