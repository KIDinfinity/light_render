import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { ExpectDecisionOperation } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';

const EXCLUDE = ExpectDecisionOperation.Exclude;

/**
 * 获取当前incidentId下diagnosisList的所有的diagnosisCode，返回diagnosisCode组成的数组
 */
export function getExistDiagnosisCode(incidentId, diagnosisListMap) {
  const diagnosisListMapEntries = Object.entries(diagnosisListMap);
  const existDiagnosisCode = [];
  lodash.map(diagnosisListMapEntries, (item) => {
    if (item[1].incidentId === incidentId) {
      existDiagnosisCode.push(formUtils.queryValue(item[1].diagnosisCode));
    }
  });

  return existDiagnosisCode;
}

/**
 * 获取当前incidentId下diagnosisList的所有的existCriticalIllness，返回existCriticalIllness组成的数组
 */
export function getExistCriticalIllness(incidentId, diagnosisListMap) {
  const diagnosisListMapEntries = Object.entries(diagnosisListMap);
  const existCriticalIllness = [];
  lodash.map(diagnosisListMapEntries, (item) => {
    if (item[1].incidentId === incidentId) {
      existCriticalIllness.push(formUtils.queryValue(item[1].criticalIllness));
    }
  });

  return existCriticalIllness;
}

/**
 * 获取当前incidentId下diagnosisList的所有的diagnosisCode\diagnosisType，返回组成的数组
 */
export function getExistDiagnosisList(incidentId: string, diagnosisListMap: any) {
  const diagnosisListMapEntries = Object.entries(diagnosisListMap);
  const existDiagnosisList = lodash.map(diagnosisListMapEntries, (item: any) => {
    if (item[1].incidentId === incidentId) {
      return {
        id: item[0],
        diagnosisCode: formUtils.queryValue(item[1].diagnosisCode),
        diagnosisType: formUtils.queryValue(item[1].diagnosisType),
      };
    }
    return null;
  });

  return lodash.compact(existDiagnosisList);
}

/**
 * 获取当前incidentId对应的claimPayable，返回claimPayable id组成的数组
 */
export function getGroupedClaimPayableList(incidentId, claimPayableListMap) {
  const claimPayableList = [];
  lodash.forEach(claimPayableListMap, (item) => {
    if (item.incidentId === incidentId) {
      claimPayableList.push({
        id: item.id,
        policyNo: formUtils.queryValue(item.policyNo),
        incidentId: formUtils.queryValue(item.incidentId),
        policyCategory: formUtils.queryValue(item.policyCategory),
        mainProductCode: formUtils.queryValue(item.mainProductCode),
        paymentAssessmentResult: item.paymentAssessmentResult,
      });
    }
  });
  const claimPayableListResult = transitionGroupClaimPayableList(claimPayableList);
  return claimPayableListResult;
}
function transitionGroupClaimPayableList(claimPayableList) {
  const groupClaimPayable = lodash.groupBy(claimPayableList, 'policyNo');

  const groupResult = [];
  lodash.forEach(groupClaimPayable, (policyGroup) => {
    const payableList = lodash.map(policyGroup, (payable) => payable.id);
    const claimPayableObj = {
      ...policyGroup[0],
      payableList,
    };
    groupResult.push(claimPayableObj);
  });

  return groupResult;
}

/**
 * 获取当前incidentId对应的claimPayable，返回claimPayable id组成的数组
 */
export function getClaimPayableIdList(incidentId, claimPayableListMap) {
  const claimPayableList = [];
  lodash.forEach(claimPayableListMap, (item) => {
    if (item.incidentId === incidentId) {
      claimPayableList.push(item.id);
    }
  });

  return claimPayableList;
}

/**
 * 获取当前incidentId对应的claimPayable，返回claimPayable id，policyNo，productCode组成的数组
 */
export function getClaimPayableList(incidentId, claimPayableListMap, claimPayableList) {
  const newClaimPayableList: any = [];
  lodash.map(claimPayableList, (item) => {
    const claimPayableItem = claimPayableListMap[item] || {};
    if (claimPayableItem.incidentId === incidentId) {
      newClaimPayableList.push({
        id: item,
        ...lodash.pick(formUtils.queryValue(claimPayableItem), [
          'policyNo',
          'productCode',
          'benefitTypeCode',
          'claimDecision',
        ]),
      });
    }
  });

  return newClaimPayableList;
}

/**
 * 获取当前incidentId对应的claimPayable，返回组成的数组
 */
export function getClaimPayableItemList(incidentId, claimPayableListMap, claimPayableList) {
  const newClaimPayableList: any = [];
  lodash.map(claimPayableList, (item) => {
    const claimPayableItem = claimPayableListMap[item] || {};
    if (claimPayableItem.incidentId === incidentId) {
      newClaimPayableList.push(claimPayableItem);
    }
  });

  return newClaimPayableList;
}

/**
 * 获取当前incidentId对应的incidentDecision，返回incidentDecision id组成的数组
 */
export function getIncidentDecisionList(
  incidentId,
  incidentDecisionListMap = {},
  apIncidentDecisionList
) {
  const incidentDecisionList: any = [];
  lodash.map(apIncidentDecisionList, (item) => {
    const claimPayableItem = incidentDecisionListMap[item] || {};
    if (claimPayableItem.incidentId === incidentId) {
      incidentDecisionList.push({
        id: item,
        policyId: formUtils.queryValue(claimPayableItem.policyId),
        productCode: formUtils.queryValue(claimPayableItem.productCode),
        benefitTypeCode: formUtils.queryValue(claimPayableItem.benefitTypeCode),
      });
    }
  });
  return incidentDecisionList;
}

/**
 *  获取最大viewOrder
 */
export const getMaxViewOrder = (ListMap: any = {}) =>
  lodash
    .chain(ListMap)
    .map((item) => item.viewOrder)
    .reduce((pre, next) => (pre > next ? pre : next), -1)
    .value();

/**
 * 获取当前treatmentId对应的treatmentPayable，
 * 返回treatmentPayable id，policyNo，productCode, benefitTypeCode, benefitItemCode组成的数组
 */
export function getTreatmentPayableList(treatmentId, treatmentPayableListMap) {
  const treatmentPayableListEntries = Object.entries(treatmentPayableListMap);
  const treatmentPayableList = [];
  lodash.map(treatmentPayableListEntries, (item) => {
    if (item[1].treatmentId === treatmentId) {
      treatmentPayableList.push(item[1]);
    }
  });

  return treatmentPayableList;
}

/**
 * 获取当前treatmentId对应的treatmentPayable，
 * 返回treatmentPayable id组成的数组
 */
export function getTreatmentPayableIdList(treatmentId, treatmentPayableListMap) {
  const treatmentPayableList = [];
  lodash.forEach(treatmentPayableListMap, (item) => {
    if (item.treatmentId === treatmentId) {
      treatmentPayableList.push(item.id);
    }
  });

  return treatmentPayableList;
}

/**
 * 获取当前treatmentId对应的treatmentPayable，
 * 返回treatmentPayable id组成的数组
 */
export function getInvoicePayableIdList(invoiceId, invoicePayableListMap) {
  const invoicePayableListEntries = Object.entries(invoicePayableListMap);
  const invoicePayableList = [];
  lodash.map(invoicePayableListEntries, (item) => {
    if (item[1].invoiceId === invoiceId) {
      invoicePayableList.push(item[0]);
    }
  });

  return invoicePayableList;
}

/**
 * 获取当前invoiceId对应的invoicePayable，
 * 返回invoicePayable组成的数组
 */
export function getInvoicePayableList(invoiceId, invoicePayableListMap) {
  const invoicePayableListEntries = Object.entries(invoicePayableListMap);
  const invoicePayableList = [];
  lodash.map(invoicePayableListEntries, (item) => {
    if (item[1].invoiceId === invoiceId) {
      invoicePayableList.push(item[1]);
    }
  });

  return invoicePayableList;
}

/**
 * 获取当前treatmentId对应的treatmentPayable，
 * 返回treatmentPayable id组成的数组
 */
export function getServicePayableIdList(serviceItemId, serviceItemPayableListMap) {
  const serviceItemPayableListEntries = Object.entries(serviceItemPayableListMap);
  const serviceItemPayableList = [];
  lodash.map(serviceItemPayableListEntries, (item) => {
    if (item[1].serviceItemId === serviceItemId) {
      serviceItemPayableList.push(item[0]);
    }
  });

  return serviceItemPayableList;
}
/**
 * 获取当前serviceItemId对应的servicePayable，
 * 返回servicePayable 组成的数组
 */
export function getServicePayableList(serviceItemId: any, serviceItemPayableListMap: any) {
  const serviceItemPayableListEntries = Object.entries(serviceItemPayableListMap);
  const serviceItemPayableList: any = [];
  lodash.map(serviceItemPayableListEntries, (item: any) => {
    if (item[1].serviceItemId === serviceItemId) {
      serviceItemPayableList.push(item[1]);
    }
  });

  return serviceItemPayableList;
}
/**
 * 获取当前treatmentId下procedureList的所有的id\procedureCode，返回组成的数组
 */
export function getProcedureList(treatmentId, procedureListMap, extraKey) {
  const procedureListMapEntries = Object.entries(procedureListMap);
  const procedureList = [];
  lodash.map(procedureListMapEntries, (item) => {
    if (item[1].treatmentId === treatmentId) {
      const operationDate = extraKey
        ? formUtils.queryValue(item[1][extraKey])
        : formUtils.queryValue(item[1].procedureCode);
      procedureList.push({
        id: item[0],
        procedureCode: formUtils.queryValue(item[1].procedureCode),
        operationDate,
      });
    }
  });

  return procedureList;
}

// TODO 待重构 将之前HK的getServicePayableList、getInvoicePayableList等Fn 删除
/**
 * 获取当前Id对应的Payable，
 * 返回Payable 组成的数组
 */
export function getPayableList(mapId: string, id: any, payableListMap: any) {
  if (!payableListMap) return [];
  const payableListEntries = Object.entries(payableListMap);
  const payableList: any = [];
  lodash.map(payableListEntries, (item: any) => {
    if (item[1][mapId] === id) {
      payableList.push(item[1]);
    }
  });

  return payableList;
}
