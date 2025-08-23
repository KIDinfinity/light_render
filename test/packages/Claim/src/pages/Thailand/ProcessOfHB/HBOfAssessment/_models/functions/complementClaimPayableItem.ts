import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import {
  LIFEPAYABLE,
  TREATMENTPAYABLEITEM,
  INVOICEPAYABLEITEM,
} from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';

/**
 * 根据选择的保单、产品、类型和当前的incident生成对应的incident payable数据
 * @param {当前在修改的claimPayableListItem} claimPayableListItem
 * @param {当前在修改的claimPayableListItem对应的incidentListItem} incidentListItem
 */
export function complementClaimPayableItem(claimPayableListItem, claimEntities) {
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

  if (editClaimPayableListItem.benefitCategory === 'L') {
    editClaimPayableListItem.lifePayable = {
      ...LIFEPAYABLE,
      ...parameter,
      id: uuidv4(),
    };
  }
  const { treatmentList } = incidentListItemValue;

  if (editClaimPayableListItem.benefitCategory === 'C' && lodash.isArray(treatmentList)) {
    editClaimPayableListItem.treatmentPayableList = lodash.map(treatmentList, (treatmentId) => {
      const treatmentPayableItem = {
        ...TREATMENTPAYABLEITEM,
        benefitCategory: 'C',
        ...parameter,
        id: uuidv4(),
        treatmentId,
        isAdd: true,
      };
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
        ...parameter,
        id: uuidv4(),
        treatmentId,
        isAdd: true,
      };

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

  return { editClaimPayableListItem, editClaimEntities };
}

export default {
  complementClaimPayableItem,
};
