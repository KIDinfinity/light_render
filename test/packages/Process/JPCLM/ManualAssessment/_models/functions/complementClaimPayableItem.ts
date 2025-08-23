import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import {
  LIFEPAYABLE,
  TREATMENTPAYABLEITEM,
  INVOICEPAYABLEITEM,
  SERVICEPAYABLEITEM,
  PROCEDUREITEMPAYABLE,
  OTHERPROCEDUREITEM,
  OPTREATMENTPAYABLE,
  INCIDENTPAYABLEITEM,
} from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { tenant } from '@/components/Tenant';
import { BenefitCategory, SwitchEnum, BenefitSubCategory } from 'claim/pages/utils/claim';
import { ClaimType } from 'claim/enum';
import { getExchangeRateValue, mapDefaultRateRecord } from 'claim/pages/utils/handleExchangeRate';

const map: any = {
  [BenefitCategory.S]: {
    list: 'procedureList',
    constant: PROCEDUREITEMPAYABLE,
    payableListMap: 'procedurePayableListMap',
    payableList: 'procedurePayableList',
    parentListMap: 'treatmentListMap',
    id: 'procedureId',
  },
  [BenefitCategory.T]: {
    list: 'otherProcedureList',
    constant: OTHERPROCEDUREITEM,
    payableListMap: 'otherProcedurePayableListMap',
    payableList: 'otherProcedurePayableList',
    parentListMap: 'treatmentListMap',
    id: 'otherProcedureId',
  },
  [BenefitCategory.cashless]: {
    constant: TREATMENTPAYABLEITEM,
    payableListMap: 'treatmentPayableListMap',
    payableList: 'treatmentPayableList',
    subList: 'invoiceListMap',
    curList: 'treatmentListMap',
    opMap: {
      list: 'opTreatmentList',
      constant: OPTREATMENTPAYABLE,
      payableListMap: 'opTreatmentPayableListMap',
      payableList: 'opTreatmentPayableList',
      parentListMap: 'treatmentListMap',
      curListMap: 'opTreatmentList',
      id: 'opTreatmentId',
    },
  },
  [BenefitCategory.reimbursement]: {
    list: 'invoiceList',
    constant: INVOICEPAYABLEITEM,
    payableListMap: 'invoicePayableListMap',
    payableList: 'invoicePayableList',
    curListMap: 'invoiceListMap',
    parentListMap: 'treatmentListMap',
    id: 'invoiceId',
    children: {
      list: 'serviceItemList',
      constant: SERVICEPAYABLEITEM,
      payableListMap: 'serviceItemPayableListMap',
      payableList: 'serviceItemPayableList',
      parentListMap: 'invoiceListMap',
      curListMap: 'serviceItemListMap',
      id: 'serviceItemId',
    },
  },
  [BenefitCategory.MajorIllnessCashBenefit]: {
    constant: INCIDENTPAYABLEITEM,
    payableListMap: 'claimIncidentPayableListMap',
    payableList: 'claimIncidentPayableList',
    id: 'incidentId',
  }
};

const getTreatmentId = (
  treatmentList: any,
  claimEntities: any,
  benefitCategory: any,
  benefitSubCategory: any
) => {
  return lodash
    .chain(treatmentList)
    .filter((id: string) => {
      const treatmentType = lodash.get(claimEntities.treatmentListMap[id], 'treatmentType');
      const opTreatmentList = lodash.get(claimEntities.treatmentListMap?.[id], 'opTreatmentList');

      if (
        treatmentType === ClaimType.IPD &&
        benefitCategory === BenefitCategory.cashless &&
        benefitSubCategory !== BenefitSubCategory.OP
      ) {
        return id;
      }
      if (
        treatmentType === ClaimType.OPD &&
        benefitCategory === BenefitCategory.cashless &&
        benefitSubCategory === BenefitSubCategory.OP &&
        lodash.size(opTreatmentList) > 0
      ) {
        return id;
      }
      if (
        benefitCategory === BenefitCategory.S ||
        benefitCategory === BenefitCategory.T ||
        benefitCategory === BenefitCategory.reimbursement
      ) {
        return id;
      }
    })
    .first()
    .value();
};

const getCommonData = (editClaimPayableListItem: any, editClaimEntities: any) => {
  const claimEntitiesValue = formUtils.cleanValidateData(editClaimEntities);
  const incidentListItemValue =
    claimEntitiesValue.incidentListMap[editClaimPayableListItem.incidentId];
  const policyCurrency = editClaimPayableListItem?.policyCurrency || tenant.currency();
  const {
    claimNo,
    policyNo,
    productCode,
    benefitTypeCode,
    incidentId,
    claimDecision,
    benefitCategory,
    benefitSubCategory
  } = editClaimPayableListItem;
  const { treatmentList } = incidentListItemValue;
  const treatmentId = getTreatmentId(
    treatmentList,
    claimEntitiesValue,
    benefitCategory,
    benefitSubCategory
  );

  return {
    claimNo,
    policyNo,
    productCode,
    benefitTypeCode,
    incidentId,
    claimDecision,
    benefitCategory,
    ...(treatmentId ? {treatmentId} : {}),
    policyCurrency,
    benefitSubCategory,
  };
};

const getSectionItem = (editClaimEntities: any, listMapVal: string, sectionId: string) => {
  const claimEntitiesValue = formUtils.cleanValidateData(editClaimEntities);
  const sectionItem = claimEntitiesValue[listMapVal][sectionId];
  return sectionItem;
};

const saveData = (editClaimEntities: any, editPayableItem: any, mapItem: any, payableItem: any) => {
  editClaimEntities[mapItem?.payableListMap][payableItem.id] = payableItem;
  editPayableItem[mapItem?.payableList] = lodash.concat([payableItem.id], (editPayableItem?.[mapItem?.payableList] || []));
};

const supplementLifePayable = (editClaimPayableListItem: any, editClaimEntities: any) => {
  const commonData = getCommonData(editClaimPayableListItem, editClaimEntities);
  editClaimPayableListItem.lifePayable = {
    ...LIFEPAYABLE,
    id: uuidv4(),
    manualAdd: SwitchEnum.YES,
    ...commonData,
  };
};

const supplementTreatmentPayable = (
  editClaimPayableListItem: any,
  editClaimEntities: any,
  commonData: any
) => {
  const mapItem = map?.[BenefitCategory.cashless];
  if (commonData.treatmentId) {
    const payableItem = {
      ...mapItem?.constant,
      benefitAmount: 0,
      id: uuidv4(),
      payableId: editClaimPayableListItem.id,
      manualAdd: SwitchEnum.YES,
      ...commonData,
    };
    let expenseAmount = 0;
    const treatmentItem = getSectionItem(
      editClaimEntities,
      mapItem.curList,
      commonData.treatmentId
    );
    const invoiceList = lodash.get(treatmentItem, 'invoiceList');
    lodash.map(invoiceList, (invoiceId) => {
      const invoiceItem = getSectionItem(editClaimEntities, mapItem.subList, invoiceId);
      expenseAmount = add(expenseAmount, invoiceItem.expense);
    });
    payableItem.expenseAmount = expenseAmount;
    saveData(editClaimEntities, editClaimPayableListItem, mapItem, payableItem);
    return payableItem;
  }
};

const supplementInvoicePayable = (
  treatmentPayable: any,
  editClaimEntities: any,
  commonData: any,
  exchangeRateList: any
) => {
  const mapItem = map?.[BenefitCategory.reimbursement];
  const treatmentItem = getSectionItem(
    editClaimEntities,
    mapItem.parentListMap,
    commonData.treatmentId
  );

  if (lodash.isArray(treatmentItem?.[mapItem?.list]) && treatmentItem?.[mapItem?.list].length > 0) {
    const invoiceId: any = lodash.first(treatmentItem[mapItem?.list]);
    const invoiceItem = getSectionItem(editClaimEntities, mapItem.curListMap, invoiceId);
    const payableItem: any = {
      ...mapItem?.constant,
      expenseAmount: invoiceItem.expense,
      id: uuidv4(),
      invoiceId,
      manualAdd: SwitchEnum.YES,
      treatmentPayableId: treatmentPayable.id,
      ...commonData,
      payableId: treatmentPayable.payableId,
    };
    const fromCurrency = invoiceItem?.invoiceCurrency;
    const toCurrency = payableItem.policyCurrency;
    const exchangeRate = getExchangeRateValue({ exchangeRateList, toCurrency, fromCurrency });
    payableItem.exchangeRateInvoicePolicy = exchangeRate;
    payableItem.exchangeRateRecord = mapDefaultRateRecord({
      fromCurrency,
      toCurrency,
      exchangeRate,
    });
    saveData(editClaimEntities, treatmentPayable, mapItem, payableItem);
    return payableItem;
  }
};

const supplementServicePayable = (invoicePayable: any, editClaimEntities: any, commonData: any) => {
  const mapItem = map?.[BenefitCategory.reimbursement].children;

  const invoiceItem = getSectionItem(
    editClaimEntities,
    mapItem.parentListMap,
    invoicePayable?.invoiceId
  );

  if (lodash.isArray(invoiceItem?.[mapItem?.list]) && invoiceItem?.[mapItem?.list].length > 0) {
    const serviceItemId: any = lodash.first(invoiceItem[mapItem?.list]);
    const serviceItem = getSectionItem(editClaimEntities, mapItem.curListMap, serviceItemId);

    const payableItem = {
      ...mapItem?.constant,
      calculationAmount: serviceItem.expense,
      expenseAmount: serviceItem.expense,
      id: uuidv4(),
      invoiceId: invoicePayable.invoiceId,
      invoicePayableId: invoicePayable.id,
      serviceItem: serviceItem.serviceItem,
      serviceItemId,
      manualAdd: SwitchEnum.YES,
      treatmentPayableId: invoicePayable.treatmentPayableId,
      ...commonData,
      payableId: invoicePayable.payableId,
      payableDays: null,
      deductibleAmount: null,
    };
    saveData(editClaimEntities, invoicePayable, mapItem, payableItem);
  }
};

const supplementProcedurePayable = (
  treatmentPayable: any,
  editClaimEntities: any,
  commonData: any
) => {
  const mapItem = map?.[commonData.benefitCategory];
  const treatmentItem = getSectionItem(
    editClaimEntities,
    mapItem?.parentListMap,
    commonData.treatmentId
  );
  if (lodash.isArray(treatmentItem?.[mapItem?.list]) && treatmentItem?.[mapItem?.list].length > 0) {
    const itemId = lodash.first(treatmentItem[mapItem?.list]);

    const payableItem = {
      ...mapItem?.constant,
      id: uuidv4(),
      payableId: treatmentPayable.payableId,
      manualAdd: SwitchEnum.YES,
      treatmentPayableId: treatmentPayable.id,
      ...commonData,
    };
    payableItem[mapItem?.id] = itemId;
    saveData(editClaimEntities, treatmentPayable, mapItem, payableItem);
  }
};

const supplementOpTreatmentPayable = (
  editClaimEntities: any,
  treatmentPayable: any,
  commonData: any
) => {
  const mapItem = map?.[BenefitCategory.cashless]?.opMap;
  const { claimNo, incidentId, treatmentId }: any = commonData;

  const opTreatmentList = editClaimEntities?.treatmentListMap?.[treatmentId]?.opTreatmentList || [];

  opTreatmentList.forEach((opTreatmentItem: any) => {
    const payableItem = {
      ...OPTREATMENTPAYABLE,
      id: uuidv4(),
      claimNo: claimNo,
      treatmentPayableId: treatmentPayable.id,
      incidentId,
      treatmentId,
      opTreatmentId: opTreatmentItem?.id,
      dateOfConsultation: opTreatmentItem.outpatientTreatmentDate,
      payableId: treatmentPayable.payableId,
    };
    editClaimEntities[mapItem?.payableListMap][payableItem.id] = payableItem;
    editClaimEntities.treatmentPayableListMap[treatmentPayable?.id][mapItem?.payableList] = [
      ...(editClaimEntities.treatmentPayableListMap[treatmentPayable?.id][mapItem?.payableList] ||
        []),
      payableItem.id,
    ];
  });
};

const funMap = {
  [BenefitCategory.life]: supplementLifePayable,
  [BenefitCategory.cashless]: (
    editClaimPayableListItem: any,
    editClaimEntities: any,
    commonData: any
  ) => {
    const treatmentPayable = supplementTreatmentPayable(
      editClaimPayableListItem,
      editClaimEntities,
      commonData
    );
    if (commonData?.benefitSubCategory === BenefitSubCategory.OP) {
      supplementOpTreatmentPayable(editClaimEntities, treatmentPayable, commonData);
    }
  },

  // supplementTreatmentPayable,
  [BenefitCategory.reimbursement]: (
    editClaimPayableListItem: any,
    editClaimEntities: any,
    commonData: any,
    exchangeRateList: any
  ) => {
    const treatmentPayable = supplementTreatmentPayable(
      editClaimPayableListItem,
      editClaimEntities,
      commonData
    );
    const invoicePayable = supplementInvoicePayable(
      treatmentPayable,
      editClaimEntities,
      commonData,
      exchangeRateList
    );

    supplementServicePayable(invoicePayable, editClaimEntities, commonData);
  },
  [BenefitCategory.S]: (editClaimPayableListItem: any, editClaimEntities: any, commonData: any) => {
    const treatmentPayable = supplementTreatmentPayable(
      editClaimPayableListItem,
      editClaimEntities,
      commonData
    );
    supplementProcedurePayable(treatmentPayable, editClaimEntities, commonData);
  },
  [BenefitCategory.T]: (editClaimPayableListItem: any, editClaimEntities: any, commonData: any) => {
    const treatmentPayable = supplementTreatmentPayable(
      editClaimPayableListItem,
      editClaimEntities,
      commonData
    );
    supplementProcedurePayable(treatmentPayable, editClaimEntities, commonData);
  },
  [BenefitCategory.MajorIllnessCashBenefit]: (editClaimPayableListItem: any, editClaimEntities: any, commonData: any) => {
    const mapItem = map?.[BenefitCategory.MajorIllnessCashBenefit];
    const payableItem = {
      ...mapItem?.constant,
      id: uuidv4(),
      payableId: editClaimPayableListItem.id,
      manualAdd: SwitchEnum.YES,
      ...commonData,
    };
    saveData(editClaimEntities, editClaimPayableListItem, mapItem, payableItem);
  }
};

/**
 * 根据选择的保单、产品、类型和当前的incident生成对应的incident payable数据
 * @param {当前在修改的claimPayableListItem} claimPayableListItem
 * @param {当前在修改的claimPayableListItem对应的incidentListItem} incidentListItem
 */
export function complementClaimPayableItem(
  claimPayableListItem: any,
  claimEntities: any,
  exchangeRateList: any
) {
  const editClaimPayableListItem = { ...claimPayableListItem };
  const editClaimEntities = { ...claimEntities };
  const commonData = getCommonData(editClaimPayableListItem, editClaimEntities);

  const handler = funMap?.[editClaimPayableListItem?.benefitCategory];
  if (lodash.isFunction(handler))
    handler(editClaimPayableListItem, editClaimEntities, commonData, exchangeRateList);

  return { editClaimPayableListItem, editClaimEntities };
}

export default {
  complementClaimPayableItem,
};
