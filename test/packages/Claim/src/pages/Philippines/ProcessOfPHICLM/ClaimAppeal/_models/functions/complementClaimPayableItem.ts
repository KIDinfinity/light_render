import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { LIFEPAYABLE, TREATMENTPAYABLEITEM, INVOICEPAYABLEITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { BenefitCategory, SwitchEnum } from 'claim/pages/utils/claim';

/**
 * 根据选择的保单、产品、类型和当前的incident生成对应的incident payable数据
 * @param {当前在修改的claimPayableListItem} claimPayableListItem
 * @param {当前在修改的claimPayableListItem对应的incidentListItem} incidentListItem
 */
export function complementClaimPayableItem(claimPayableListItem, claimEntities, sumAssured = 0) {
  const editClaimPayableListItem = { ...claimPayableListItem };
  const editClaimEntities = { ...claimEntities };
  const claimEntitiesValue = formUtils.cleanValidateData(claimEntities);
  const incidentListItemValue =
    claimEntitiesValue.incidentListMap[editClaimPayableListItem.incidentId];

  const { claimNo, policyNo, productCode, benefitTypeCode, incidentId } = editClaimPayableListItem;
  const payableId = editClaimPayableListItem.id;

  const parameter = {
    benefitTypeCode,
    claimNo,
    incidentId,
    payableId,
    policyNo,
    productCode,
  };

  if (editClaimPayableListItem.benefitCategory === 'L') {
    editClaimPayableListItem.lifePayable = {
      ...LIFEPAYABLE,
      benefitTypeCode,
      claimNo,
      id: uuidv4(),
      incidentId,
      payableId,
      policyNo,
      productCode,
    };
  }
  const { treatmentList } = incidentListItemValue;

  if (editClaimPayableListItem.benefitCategory === 'C' && lodash.isArray(treatmentList)) {
    editClaimPayableListItem.treatmentPayableList = lodash.map(treatmentList, (treatmentId) => {
      const treatmentPayableItem = {
        ...TREATMENTPAYABLEITEM,
        benefitAmount: 0,
        benefitCategory: 'C',
        benefitTypeCode,
        claimNo,
        id: uuidv4(),
        incidentId,
        payableId,
        policyNo,
        productCode,
        treatmentId,
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

  if (editClaimPayableListItem.benefitCategory === 'R' && lodash.isArray(treatmentList)) {
    editClaimPayableListItem.treatmentPayableList = lodash.map(treatmentList, (treatmentId) => {
      const treatmentItem = claimEntitiesValue.treatmentListMap[treatmentId];
      const treatmentPayableItem = {
        ...TREATMENTPAYABLEITEM,
        benefitCategory: 'R',
        benefitTypeCode,
        claimNo,
        id: uuidv4(),
        incidentId,
        payableId,
        policyNo,
        productCode,
        treatmentId,
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
            treatmentPayableId: treatmentPayableItem.id,
          };
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
        benefitAmount: sumAssured,
        benefitCategory: BenefitCategory.aipa,
        accidentBenefitPayableList: [],
        ...parameter,
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
