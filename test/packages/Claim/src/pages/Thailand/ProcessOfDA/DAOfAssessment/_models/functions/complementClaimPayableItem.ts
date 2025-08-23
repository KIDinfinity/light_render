/* eslint-disable import/no-unresolved */
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { LIFEPAYABLE, TREATMENTPAYABLEITEM, INVOICEPAYABLEITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import { BenefitCategory, SwitchEnum } from 'claim/pages/utils/claim';

/**
 * 根据选择的保单、产品、类型和当前的incident生成对应的incident payable数据
 * @param {当前在修改的claimPayableListItem} claimPayableListItem
 * @param {当前在修改的claimPayableListItem对应的incidentListItem} incidentListItem
 */
export function complementClaimPayableItem(claimPayableListItem, claimEntities, sumAssured) {
  const editClaimPayableListItem = { ...claimPayableListItem };
  const editClaimEntities = lodash.cloneDeep(claimEntities);
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

  if (editClaimPayableListItem.benefitCategory === BenefitCategory.life) {
    editClaimPayableListItem.lifePayable = {
      ...LIFEPAYABLE,
      ...parameter,
      id: uuidv4(),
      manualAdd: SwitchEnum.YES,
    };
  }
  const { treatmentList } = incidentListItemValue;

  if (
    editClaimPayableListItem.benefitCategory === BenefitCategory.cashless &&
    lodash.isArray(treatmentList)
  ) {
    editClaimPayableListItem.treatmentPayableList = lodash.map(treatmentList, (treatmentId) => {
      const treatmentPayableItem = {
        ...TREATMENTPAYABLEITEM,
        benefitAmount: sumAssured,
        benefitCategory: BenefitCategory.cashless,
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

  if (
    editClaimPayableListItem.benefitCategory === BenefitCategory.reimbursement &&
    lodash.isArray(treatmentList)
  ) {
    const treatmentPayableList = lodash.get(editClaimPayableListItem, 'treatmentPayableList', []);
    if (lodash.isArray(treatmentPayableList) && treatmentPayableList.length) {
      lodash.forEach(treatmentPayableList, (id: any) => {
        const treatmentPayableItem = claimEntitiesValue.treatmentPayableListMap[id];
        const { treatmentId } = treatmentPayableItem;
        const treatmentItem = claimEntitiesValue.treatmentListMap[treatmentId];
        let invoicePayableList: any = [];
        if (lodash.isArray(treatmentItem.invoiceList) && treatmentItem.invoiceList.length > 0) {
          invoicePayableList = lodash.map(treatmentItem.invoiceList, (invoiceId) => {
            const invoiceItem = claimEntitiesValue.invoiceListMap[invoiceId];
            const invoicePayableItem = {
              ...INVOICEPAYABLEITEM,
              ...parameter,
              expenseAmount: invoiceItem.expense,
              id: uuidv4(),
              invoiceId,
              treatmentId,
              treatmentPayableId: id,
              isAdd: true,
            };
            editClaimEntities.invoicePayableListMap[invoicePayableItem.id] = invoicePayableItem;
            return invoicePayableItem.id;
          });
        }
        treatmentPayableItem.invoicePayableList = invoicePayableList;
        editClaimEntities.treatmentPayableListMap[id] = treatmentPayableItem;
      });
    } else {
      editClaimPayableListItem.treatmentPayableList = lodash.map(treatmentList, (treatmentId) => {
        const treatmentItem = claimEntitiesValue.treatmentListMap[treatmentId];

        const treatmentPayableItem = {
          ...TREATMENTPAYABLEITEM,
          benefitCategory: BenefitCategory.reimbursement,
          ...parameter,
          id: uuidv4(),
          treatmentId,
          isAdd: true,
        };

        let invoicePayableList: any = [];
        if (lodash.isArray(treatmentItem.invoiceList) && treatmentItem.invoiceList.length) {
          invoicePayableList = lodash.map(treatmentItem.invoiceList, (invoiceId) => {
            const invoiceItem = claimEntitiesValue.invoiceListMap[invoiceId];
            const invoicePayableItem = {
              ...INVOICEPAYABLEITEM,
              ...parameter,
              expenseAmount: invoiceItem.expense,
              id: uuidv4(),
              invoiceId,
              treatmentId,
              treatmentPayableId: treatmentPayableItem.id,
              isAdd: true,
            };
            editClaimEntities.invoicePayableListMap[invoicePayableItem.id] = invoicePayableItem;
            return invoicePayableItem.id;
          });
        }
        treatmentPayableItem.invoicePayableList = invoicePayableList;
        editClaimEntities.treatmentPayableListMap[treatmentPayableItem.id] = treatmentPayableItem;
        return treatmentPayableItem.id;
      });
    }
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
