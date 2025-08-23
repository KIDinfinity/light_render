/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import{ v4 as  uuidv4 } from 'uuid';
import {
  map,
  isArray,
  some,
  find,
  isNumber,
  forEach,
  isEmpty,
  groupBy,
  filter,
  compact,
  concat,
} from 'lodash';
import { add } from '@/utils/precisionUtils';
import { BenefitCategory, SwitchEnum, ClaimDecision } from 'claim/pages/utils/claim';
import {
  LIFEPAYABLE,
  TREATMENTPAYABLEITEM,
  POLICYBENEFITITEM,
  BENEFICIARYITEM,
} from 'claim/pages/utils/claimConstant';
import { cleanFieldsMeta, getFieldValue } from 'claim/pages/utils/formUtils';
import {
  BeneficiaryPayableType,
  PolicyType,
  PolicySetupStatus,
  PolicyCategory,
} from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import { formUtils } from 'basic/components/Form';

const LIFE = BenefitCategory.life;
const CASHLESS = BenefitCategory.cashless;
const REIMBURSEMENT = BenefitCategory.reimbursement;
const NOIMPLEMENT = PolicySetupStatus.NoImplement;
const STANDARD = PolicySetupStatus.Standard;
const NOBELONG = PolicySetupStatus.NoBelong;
const INSURANCE = BeneficiaryPayableType.Insurance;
const PAYMENTS = BeneficiaryPayableType.Payments;
const INDIVIDUAL = PolicyType.Individual;
const GROUP = PolicyType.Group;

const compareCommonPart = (source: any, target: any, policySetupStatus: string) => {
  switch (policySetupStatus) {
    case NOBELONG:
      return source.policyNo === target.policyNo;
    case NOIMPLEMENT:
      return source.policyNo === target.policyNo && source.productCode === target.productCode;
    case STANDARD:
    default:
      return (
        source.policyNo === target.policyNo &&
        source.productCode === target.productCode &&
        source.benefitTypeCode === target.benefitTypeCode
      );
  }
};
// --------------------------claimPayable层级
export const checkClaimPayableIsLife = (claimPayableItem) =>
  claimPayableItem.benefitCategory === LIFE && claimPayableItem.lifePayable;

// claimPayable重复性校验，重复返回true，不重复返回false
export const checkPolicyNoDuplicate = (claimPayableListMap: any, claimPayableItem: any) => {
  const claimPayableListMapValue = cleanFieldsMeta(claimPayableListMap);
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { id, incidentId, policyNo, productCode, benefitTypeCode } = claimPayableItemValue;

  return some(
    claimPayableListMapValue,
    (payableItem) =>
      payableItem.id !== id &&
      payableItem.incidentId === incidentId &&
      payableItem.policyNo === policyNo &&
      isEmpty(payableItem.productCode) &&
      isEmpty(payableItem.benefitTypeCode) &&
      isEmpty(productCode) &&
      isEmpty(benefitTypeCode)
  );
};

// claimPayable重复性校验，重复返回true，不重复返回false
export const checkProductCodeDuplicate = (claimPayableListMap: any, claimPayableItem: any) => {
  const claimPayableListMapValue = cleanFieldsMeta(claimPayableListMap);
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { id, incidentId, policyNo, productCode, benefitTypeCode } = claimPayableItemValue;

  return some(
    claimPayableListMapValue,
    (payableItem) =>
      payableItem.id !== id &&
      payableItem.incidentId === incidentId &&
      payableItem.policyNo === policyNo &&
      payableItem.productCode === productCode &&
      isEmpty(payableItem.benefitTypeCode) &&
      isEmpty(benefitTypeCode)
  );
};

// claimPayable重复性校验，重复返回true，不重复返回false
export const checkClaimPayableDuplicate = (claimPayableListMap: any, claimPayableItem: any) => {
  const claimPayableListMapValue = cleanFieldsMeta(claimPayableListMap);
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { id, incidentId, policySetupStatus } = claimPayableItemValue;
  return some(
    claimPayableListMapValue,
    (payableItem) =>
      payableItem.benefitCategory !== LIFE &&
      payableItem.id !== id &&
      payableItem.incidentId === incidentId &&
      compareCommonPart(payableItem, claimPayableItemValue, policySetupStatus)
  );
};

// lifePayable重复性校验，重复返回true，不重复返回false
export const checkLifePayableDuplicate = (claimPayableListMap: any, claimPayableItem: any) => {
  const claimPayableListMapValue = cleanFieldsMeta(claimPayableListMap);
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { id, incidentId, lifePayable, policySetupStatus } = claimPayableItemValue;

  return some(
    claimPayableListMapValue,
    (payableItem) =>
      payableItem.benefitCategory === LIFE &&
      payableItem.id !== id &&
      payableItem.incidentId === incidentId &&
      compareCommonPart(payableItem, claimPayableItemValue, policySetupStatus) &&
      payableItem.lifePayable.benefitItemCode === lifePayable.benefitItemCode
  );
};

// otherProcedure 在当前treatment下进行重复性校验，重复返回true，不重复返回false
export const checkOtherProcedureDuplicate = (
  treatmentListMap: any,
  otherProcedureListMap: any,
  otherProcedureItem: any
) => {
  const { treatmentId } = otherProcedureItem;
  const { otherProcedureList } = treatmentListMap[treatmentId];
  const otherProcedureMap = cleanFieldsMeta(otherProcedureListMap);
  const otherProcedure = cleanFieldsMeta(otherProcedureItem);
  const { procedureCode, id } = otherProcedure;
  const procedureVal = formUtils.queryValue(procedureCode);

  return some(
    otherProcedureList,
    (procedureId) =>
      id !== procedureId &&
      procedureVal &&
      formUtils.queryValue(otherProcedureMap[procedureId].procedureCode) === procedureVal
  );
};

/**
 *
 * @param listPolicy
 * @param claimPayableItem
 */
export const getPolicyCategoryByPolicyNo = (listPolicy: any, claimPayableItem: any) => {
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { policyNo, incidentId } = claimPayableItemValue;
  if (isEmpty(policyNo)) {
    return '';
  }
  const policyById =
    find(listPolicy, (item) => item.policyNo === policyNo && item.incidentId === incidentId) || {};
  return policyById ? policyById.policyCategory : PolicyCategory.OTHER;
};

/**
 *
 * @param listPolicy
 * @param claimPayableItem
 */
export const getMainProductCodeByPolicyNo = (listPolicy: any, claimPayableItem: any) => {
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { policyNo, incidentId } = claimPayableItemValue;
  if (isEmpty(policyNo)) {
    return '';
  }
  const policyById =
    find(
      listPolicy,
      (item) => item.policyNo === policyNo && item.incidentId === incidentId && item.mainProductCode
    ) || {};
  return policyById ? policyById.mainProductCode : '';
};

/**
 *
 * @param listPolicy
 * @param claimPayableItem
 */
export const getMappingPayableByPolicyNo = (claimPayableListMap: any, incidentPayableAdd: any) => {
  const claimPayableListMapValue = cleanFieldsMeta(claimPayableListMap);
  const incidentPayableAddValue = cleanFieldsMeta(incidentPayableAdd);

  const payable = find(
    claimPayableListMapValue,
    (item) =>
      item.policyNo === incidentPayableAddValue.policyNo &&
      item.incidentId === incidentPayableAddValue.incidentId
  );
  return payable || '';
};

export const getMappingPolicyByProduct = (listPolicy: any, claimPayableItem: any) => {
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { policyNo, productCode } = claimPayableItemValue;

  return (
    find(
      listPolicy,
      (item) => item.policyNo === policyNo && item.coreProductCode === productCode
    ) || {}
  );
};

export const getMappingPolicyByBenefit = (listPolicy: any, claimPayableItem: any) => {
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { policyNo, productCode, benefitTypeCode } = claimPayableItemValue;
  return (
    find(
      listPolicy,
      (item) =>
        item.policyNo === policyNo &&
        item.coreProductCode === productCode &&
        item.benefitTypeCode === benefitTypeCode
    ) || {}
  );
};

export const getPolicySetupStatusByPolicyNo = (listPolicy: any, claimPayableItem: any) => {
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const { policyNo } = claimPayableItemValue;
  const result = find(
    listPolicy,
    (item) => item.policyNo === policyNo && item.policySetupStatus === NOIMPLEMENT
  );
  return result ? result.policySetupStatus : null;
};

// 根据选择的保单和当前的incident生成payable数据,每个treatment添加对应的treatmentPayable
export const supplementClaimPayableItem = (claimEntities: any, claimPayableItem: any) => {
  const claimPayableItemValue = cleanFieldsMeta(claimPayableItem);
  const incidentListItemValue = cleanFieldsMeta(
    claimEntities.incidentListMap[claimPayableItemValue.incidentId]
  );
  const manualAdd = SwitchEnum.YES;
  const {
    claimNo,
    incidentId,
    id,
    policyNo,
    productCode,
    benefitTypeCode,
    benefitCategory,
  } = claimPayableItemValue;
  // 寿险
  if (benefitCategory === LIFE) {
    claimPayableItem.lifePayable = {
      ...LIFEPAYABLE,
      benefitTypeCode,
      claimNo,
      id: uuidv4(),
      incidentId,
      payableId: id,
      policyNo,
      productCode,
      manualAdd,
    };
  }
  const { treatmentList } = incidentListItemValue;
  // 津贴型
  if (benefitCategory === CASHLESS && isArray(treatmentList)) {
    claimPayableItem.treatmentPayableList = map(treatmentList, (treatmentId) => {
      const treatmentPayableId = uuidv4();
      const treatmentPayableItem = {
        ...TREATMENTPAYABLEITEM,
        benefitCategory,
        benefitTypeCode,
        claimNo,
        id: treatmentPayableId,
        incidentId,
        payableId: id,
        policyNo,
        productCode,
        treatmentId,
        manualAdd,
      };
      claimEntities.treatmentPayableListMap[treatmentPayableId] = treatmentPayableItem;
      return treatmentPayableId;
    });
  }
  // 补偿型
  if (benefitCategory === REIMBURSEMENT && isArray(treatmentList)) {
    claimPayableItem.treatmentPayableList = map(treatmentList, (treatmentId) => {
      const treatmentPayableId = uuidv4();
      const treatmentPayableItem = {
        ...TREATMENTPAYABLEITEM,
        benefitCategory,
        benefitTypeCode,
        claimNo,
        id: treatmentPayableId,
        incidentId,
        payableId: id,
        policyNo,
        productCode,
        treatmentId,
        manualAdd,
      };
      claimEntities.treatmentPayableListMap[treatmentPayableId] = treatmentPayableItem;
      return treatmentPayableId;
    });
  }
};

export const removeTreatmentPayableList = (claimEntities: any, claimPayableItem: any) => {
  const { treatmentPayableList } = claimPayableItem;
  if (isArray(treatmentPayableList) && treatmentPayableList.length) {
    claimPayableItem.treatmentPayableList = [];

    map(treatmentPayableList, (treatmentPayableId) => {
      delete claimEntities.treatmentPayableListMap[treatmentPayableId];
    });
  }
};

export const clearDataForPolicyNo = (claimEntities: any, claimPayableItem: any) => {
  removeTreatmentPayableList(claimEntities, claimPayableItem);
  claimPayableItem.policyCategory = '';
  claimPayableItem.policySetupStatus = '';
  claimPayableItem.productCode = '';
  claimPayableItem.benefitTypeCode = '';
  claimPayableItem.benefitCategory = '';
  claimPayableItem.lifePayable = null;
};

export const clearDataForProduct = (claimEntities: any, claimPayableItem: any) => {
  removeTreatmentPayableList(claimEntities, claimPayableItem);
  claimPayableItem.policySetupStatus = '';
  claimPayableItem.benefitTypeCode = '';
  claimPayableItem.benefitCategory = '';
  claimPayableItem.lifePayable = null;
};

export const clearDataForBenefitType = (claimEntities: any, claimPayableItem: any) => {
  removeTreatmentPayableList(claimEntities, claimPayableItem);
  claimPayableItem.benefitCategory = '';
  claimPayableItem.lifePayable = null;
};

// ---------------------------treatmentPayable层级
// treatmentPayable重复性校验，重复返回true，不重复返回false
export const checkTreatmentPayableDuplicate = (
  treatmentPayableListMap: any,
  treatmentPayableItem: any
) => {
  const treatmentPayableListMapValue = cleanFieldsMeta(treatmentPayableListMap);
  const treatmentPayableItemValue = cleanFieldsMeta(treatmentPayableItem);
  const {
    id,
    treatmentId,
    policyNo,
    productCode,
    benefitTypeCode,
    benefitItemCode,
  } = treatmentPayableItemValue;

  return some(
    treatmentPayableListMapValue,
    (payableItem) =>
      payableItem.id !== id &&
      payableItem.treatmentId === treatmentId &&
      payableItem.policyNo === policyNo &&
      payableItem.productCode === productCode &&
      payableItem.benefitTypeCode === benefitTypeCode &&
      payableItem.benefitItemCode === benefitItemCode
  );
};

// ----------------------------payable汇总

// 逐级计算payableAmount和treatmentExpenseAmount： serveiceItem -> invoice -> treatment ->payable
export const summaryAmountToClaimDecision = (claimProcessData, claimEntities) => {
  let totalPayableAmount = 0;
  const { claimPayableList } = claimProcessData;
  const { claimPayableListMap, treatmentPayableListMap } = claimEntities;
  if (claimPayableList && claimPayableList.length) {
    forEach(claimPayableList, (claimPayableItemId) => {
      const {
        benefitCategory,
        treatmentPayableList,
        claimDecision,
        policySetupStatus,
      } = claimPayableListMap[claimPayableItemId];
      // 津贴型/补偿型时，总金额为所有治疗的总额的总和
      if (benefitCategory === CASHLESS || benefitCategory === REIMBURSEMENT) {
        let totleTreatmentPayableAmount = 0;
        let totleAssessorOverrideAmount = null;
        let totleSystemCalculationAmount = null;
        forEach(treatmentPayableList, (treatmentItemId) => {
          const treatmentItem = treatmentPayableListMap[treatmentItemId];
          const systemCalculationAmount = getFieldValue(treatmentItem.systemCalculationAmount);
          const assessorOverrideAmount = getFieldValue(treatmentItem.assessorOverrideAmount);
          const payableAmount = getFieldValue(treatmentItem.payableAmount);
          // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
          if (isNumber(assessorOverrideAmount)) {
            totleAssessorOverrideAmount = add(
              Number(totleAssessorOverrideAmount),
              assessorOverrideAmount
            );
          }
          if (isNumber(systemCalculationAmount)) {
            totleSystemCalculationAmount = add(
              Number(totleSystemCalculationAmount),
              systemCalculationAmount
            );
          }
          totleTreatmentPayableAmount = add(totleTreatmentPayableAmount, Number(payableAmount));
        });

        claimPayableListMap[claimPayableItemId].payableAmount = totleTreatmentPayableAmount;
        claimPayableListMap[
          claimPayableItemId
        ].systemCalculationAmount = totleSystemCalculationAmount;
        claimPayableListMap[claimPayableItemId].assessorOverrideAmount = null;
        if (isNumber(totleAssessorOverrideAmount)) {
          claimPayableListMap[
            claimPayableItemId
          ].assessorOverrideAmount = totleTreatmentPayableAmount;
        }
      }
      if (policySetupStatus === NOIMPLEMENT) {
        if (isArray(treatmentPayableList) && treatmentPayableList.length) {
          let totleTreatmentPayableAmount = 0;
          let totleAssessorOverrideAmount = null;
          forEach(treatmentPayableList, (treatmentItemId) => {
            const treatmentItem = treatmentPayableListMap[treatmentItemId];
            const assessorOverrideAmount = getFieldValue(treatmentItem.assessorOverrideAmount);
            const payableAmount = getFieldValue(treatmentItem.payableAmount);
            // payableAmount取值，assessorOverrideAmount的权重大于systemCalculationAmount
            if (isNumber(assessorOverrideAmount)) {
              totleAssessorOverrideAmount = add(
                Number(totleAssessorOverrideAmount),
                assessorOverrideAmount
              );
            }
            totleTreatmentPayableAmount = add(totleTreatmentPayableAmount, Number(payableAmount));
          });

          claimPayableListMap[claimPayableItemId].payableAmount = totleTreatmentPayableAmount;
          claimPayableListMap[claimPayableItemId].assessorOverrideAmount = null;
          if (isNumber(totleAssessorOverrideAmount)) {
            claimPayableListMap[
              claimPayableItemId
            ].assessorOverrideAmount = totleTreatmentPayableAmount;
          }
        }
      }

      if (getFieldValue(claimDecision) === ClaimDecision.approve) {
        totalPayableAmount = add(
          totalPayableAmount,
          getFieldValue(claimPayableListMap[claimPayableItemId].payableAmount)
        );
      }
    });
  }

  claimProcessData.claimDecision = {
    ...claimProcessData.claimDecision,
    totalPayableAmount,
    claimPayableAmount: totalPayableAmount,
  };
};

const handleNoImplement = (claimPayableList, policyOwnerListMap) => {
  if (claimPayableList && claimPayableList.length) {
    const { claimNo } = claimPayableList[0];
    const policyGrouped = groupBy(claimPayableList, 'policyNo');
    const policyGroupedList = Object.entries(policyGrouped);
    const tempPolicyBenefitList = [];
    // 根据claimPayableList生成tempPolicyBenefitList
    forEach(policyGroupedList, (policyGroupedItem) => {
      let benefitAmount = 0;
      const policyOwner = policyOwnerListMap[policyGroupedItem[0]] || {};
      const policyHolder = policyOwner.firstName;
      forEach(policyGroupedItem[1], (payableItem) => {
        const { payableAmount, claimDecision } = payableItem;
        // benefitTypeCode存在&&是给付金
        if (isNumber(payableAmount) && claimDecision === 'A') {
          benefitAmount = add(benefitAmount, payableAmount);
        }
      });
      if (benefitAmount > 0) {
        tempPolicyBenefitList.push({
          ...POLICYBENEFITITEM,
          benefitAmount,
          claimNo,
          id: uuidv4(),
          policyHolder,
          policyNo: policyGroupedItem[0],
          policySetupStatus: NOIMPLEMENT,
        });
      }
    });
    return tempPolicyBenefitList;
  }
  return [];
};

const handleStandard = (claimPayableList, policyOwnerListMap, beneficiaryPayableTypeMap) => {
  if (claimPayableList && claimPayableList.length) {
    const { claimNo } = claimPayableList[0];
    const validClaimPayableList = filter(
      claimPayableList,
      (claimPayableItem) =>
        !isEmpty(claimPayableItem.benefitTypeCode) && claimPayableItem.claimDecision === 'A'
    );
    const policyGrouped = groupBy(validClaimPayableList, 'policyNo');
    const policyGroupedList = Object.entries(policyGrouped);
    const tempPolicyBenefitList = [];
    // 根据claimPayableList生成tempPolicyBenefitList
    forEach(policyGroupedList, (policyGroupedItem) => {
      let capitalBenefitAmount = 0;
      let deathBenefitAmount = 0;
      const policyOwner = policyOwnerListMap[policyGroupedItem[0]] || {};
      const policyHolder = policyOwner.firstName;
      forEach(policyGroupedItem[1], (payableItem) => {
        const { payableAmount, benefitTypeCode } = payableItem;
        // benefitTypeCode是给付金
        if (isNumber(payableAmount) && beneficiaryPayableTypeMap[benefitTypeCode] === PAYMENTS) {
          capitalBenefitAmount = add(capitalBenefitAmount, payableAmount);
        } else if (
          isNumber(payableAmount) &&
          beneficiaryPayableTypeMap[benefitTypeCode] === INSURANCE
        ) {
          // benefitTypeCode是保险金
          deathBenefitAmount = add(deathBenefitAmount, payableAmount);
        }
      });
      if (capitalBenefitAmount > 0) {
        tempPolicyBenefitList.push({
          ...POLICYBENEFITITEM,
          benefitAmount: capitalBenefitAmount,
          claimNo,
          id: uuidv4(),
          payablesType: PAYMENTS,
          policyHolder,
          policyNo: policyGroupedItem[0],
          policyType: INDIVIDUAL,
          policySetupStatus: STANDARD,
        });
      }
      if (deathBenefitAmount > 0) {
        tempPolicyBenefitList.push({
          ...POLICYBENEFITITEM,
          benefitAmount: deathBenefitAmount,
          claimNo,
          id: uuidv4(),
          payablesType: INSURANCE,
          policyHolder,
          policyNo: policyGroupedItem[0],
          policyType: GROUP,
          policySetupStatus: STANDARD,
        });
      }
    });
    return tempPolicyBenefitList;
  }
  return [];
};
// 根据claimPayableList生成tempPolicyBenefitList;
const handleTempPolicyBenefitList = ({
  claimProcessData,
  claimEntities,
  beneficiaryPayableTypeMap,
  policyOwnerListMap,
}) => {
  const claimPayableList = map(
    claimProcessData.claimPayableList,
    (claimpayableItemId) => claimEntities.claimPayableListMap[claimpayableItemId]
  );
  const claimPayableListValue = cleanFieldsMeta(claimPayableList);
  const policySetupStatusGroup = groupBy(claimPayableListValue, 'policySetupStatus');
  const noImplementPolicyList = policySetupStatusGroup[NOIMPLEMENT];
  const standardPolicyList = policySetupStatusGroup[STANDARD];
  const noImplementPolicyBenefitList = handleNoImplement(noImplementPolicyList, policyOwnerListMap);
  const standardPolicyBenefitList = handleStandard(
    standardPolicyList,
    policyOwnerListMap,
    beneficiaryPayableTypeMap
  );
  return [...noImplementPolicyBenefitList, ...standardPolicyBenefitList];
};
// 判断保单受益是否是已存在，已存在则返回更新的保单收益，不存在返回null
const checkPolicyBenefitIsExist = (policyBenefitListMap, policyBenefitItem) => {
  let result = null;
  forEach(policyBenefitListMap, (oldPolicyBenefitItem) => {
    // RCS未配置的保单用保单号校验
    if (
      oldPolicyBenefitItem.policySetupStatus === NOIMPLEMENT &&
      oldPolicyBenefitItem.policyNo === policyBenefitItem.policyNo
    ) {
      result = { ...oldPolicyBenefitItem, benefitAmount: policyBenefitItem.benefitAmount };
    } else if (
      oldPolicyBenefitItem.policySetupStatus === STANDARD &&
      oldPolicyBenefitItem.policyNo === policyBenefitItem.policyNo &&
      oldPolicyBenefitItem.payablesType === policyBenefitItem.payablesType
    ) {
      result = { ...oldPolicyBenefitItem, benefitAmount: policyBenefitItem.benefitAmount };
    }
  });
  return result;
};
const handleNewPolicyBenefitList = ({ claimProcessData, claimEntities, tempPolicyBenefitList }) => {
  const { policyBenefitListMap, beneficiaryListMap } = claimEntities;
  const newPolicyBenefitList = [];
  // 根据tempPolicyBenefitList生成newPolicyBenefitList
  forEach(tempPolicyBenefitList, (tempPolicyBenefitItem) => {
    const policyBenefitIsExist = checkPolicyBenefitIsExist(
      policyBenefitListMap,
      tempPolicyBenefitItem
    );
    if (policyBenefitIsExist) {
      newPolicyBenefitList.push(policyBenefitIsExist);
    } else {
      newPolicyBenefitList.push(tempPolicyBenefitItem);
    }
  });
  claimEntities.policyBenefitListMap = {};
  let allBeneficiaryIdList = [];
  const newPolicyBenefitIdList = map(newPolicyBenefitList, (newPolicyBenefitListItem) => {
    const { id, beneficiaryList } = newPolicyBenefitListItem;
    claimEntities.policyBenefitListMap[id] = newPolicyBenefitListItem;
    if (isArray(beneficiaryList) && beneficiaryList.length) {
      allBeneficiaryIdList = concat(allBeneficiaryIdList, beneficiaryList);
    }
    return newPolicyBenefitListItem.id;
  });
  // 删除不包含的收取人
  forEach(beneficiaryListMap, (value, key) => {
    if (!allBeneficiaryIdList.includes(key)) {
      delete beneficiaryListMap[key];
    }
  });
  claimProcessData.policyBenefitList = newPolicyBenefitIdList;
};
const getBeneficiaryPayeeId = (policyPayeeList, policyNo, firstName) => {
  const payee = find(
    policyPayeeList,
    (item) => item.policyId === policyNo && item.beneficiaryName === firstName
  );
  return payee ? payee.payeeId : null;
};

const handleBeneficicayList = ({
  claimProcessData,
  claimEntities,
  policyBeneficiaryListMap,
  policyInsuredListMap,
}) => {
  const { policyBenefitList, policyPayeeList } = claimProcessData;
  forEach(policyBenefitList, (policyBenefitItemId) => {
    const policybenefitItem = claimEntities.policyBenefitListMap[policyBenefitItemId];
    const {
      beneficiaryList,
      benefitAmount,
      policyType,
      policyNo,
      claimNo,
      id,
      policySetupStatus,
    } = policybenefitItem;
    // 当beneficiaryList不为长度大于0的数组时，并且是RCS配置的保单，填充beneficiaryList
    if (!(isArray(beneficiaryList) && beneficiaryList.length) && policySetupStatus === STANDARD) {
      // 为给付金时，受取人是insured
      if (policyType === INDIVIDUAL) {
        const policyInsured = policyInsuredListMap[policyNo];
        const beneficiaryId = uuidv4();
        const beneficiaryItem = {
          ...BENEFICIARYITEM,
          address: policyInsured.address,
          beneficiaryAmount: benefitAmount,
          beneficiaryPercentage: 100,
          claimNo,
          dateOfBirth: policyInsured.dateOfBirth,
          email: policyInsured.email,
          firstName: policyInsured.firstName,
          gender: policyInsured.gender,
          id: beneficiaryId,
          identityNo: policyInsured.identityNo,
          identityType: policyInsured.identityType,
          phoneNo: policyInsured.phoneNo,
          applicantPhoneNo: policyInsured.applicantPhoneNo,
          applicantContactInfoType: policyInsured.applicantContactInfoType,
          applicantSmsNo: policyInsured.applicantSmsNo,
          policyBenefitId: id,
          postCode: policyInsured.postCode,
          surname: policyInsured.surname,
        };
        beneficiaryItem.payeeId = getBeneficiaryPayeeId(
          policyPayeeList,
          policyNo,
          beneficiaryItem.firstName
        );
        claimEntities.beneficiaryListMap[beneficiaryId] = beneficiaryItem;
        claimEntities.policyBenefitListMap[policyBenefitItemId].beneficiaryList = [beneficiaryId];
      } else if (policyType === GROUP) {
        // 为保险金时，受取人是保单主契约者
        const policyBeneficiary = policyBeneficiaryListMap[policyNo];
        const beneficiaryId = uuidv4();
        const beneficiaryItem = {
          ...BENEFICIARYITEM,
          address: policyBeneficiary.address,
          beneficiaryAmount: benefitAmount,
          beneficiaryPercentage: 100,
          claimNo,
          dateOfBirth: policyBeneficiary.dateOfBirth,
          email: policyBeneficiary.email,
          firstName: policyBeneficiary.firstName,
          gender: policyBeneficiary.gender,
          id: beneficiaryId,
          identityNo: policyBeneficiary.identityNo,
          identityType: policyBeneficiary.identityType,
          phoneNo: policyBeneficiary.phoneNo,
          applicantPhoneNo: policyBeneficiary.applicantPhoneNo,
          applicantContactInfoType: policyBeneficiary.applicantContactInfoType,
          applicantSmsNo: policyBeneficiary.applicantSmsNo,
          policyBenefitId: id,
          postCode: policyBeneficiary.postCode,
          surname: policyBeneficiary.surname,
        };
        beneficiaryItem.payeeId = getBeneficiaryPayeeId(
          policyPayeeList,
          policyNo,
          beneficiaryItem.firstName
        );
        claimEntities.beneficiaryListMap[beneficiaryId] = beneficiaryItem;
        claimEntities.policyBenefitListMap[policyBenefitItemId].beneficiaryList = [beneficiaryId];
      }
    } else {
      // 当beneficiaryList为长度大于0的数组或者是RCS未配置的保单时，更新beneficiaryAmount
      forEach(beneficiaryList, (beneficiaryItemId) => {
        const percentage = formUtils.queryValue(
          claimEntities.beneficiaryListMap[beneficiaryItemId].beneficiaryPercentage
        );
        claimEntities.beneficiaryListMap[beneficiaryItemId].beneficiaryAmount = percentage
          ? Math.floor((percentage / 100) * benefitAmount || 0)
          : benefitAmount;
        claimEntities.beneficiaryListMap[beneficiaryItemId].beneficiaryPercentage =
          percentage || 100;
      });
    }
  });
};
// 更新保单受取人数据
export const updatPolicyBenefitList = ({
  claimProcessData,
  claimEntities,
  beneficiaryPayableTypeMap,
  policyBeneficiaryListMap,
  policyInsuredListMap,
  policyOwnerListMap,
}) => {
  if (
    isEmpty(claimProcessData) ||
    isEmpty(claimEntities) ||
    isEmpty(beneficiaryPayableTypeMap) ||
    isEmpty(policyBeneficiaryListMap) ||
    isEmpty(policyInsuredListMap)
  ) {
    return;
  }
  const { claimPayableList } = claimProcessData;
  if (isArray(claimPayableList) && claimPayableList.length > 0) {
    // 根据claimPayableList生成tempPolicyBenefitList
    const tempPolicyBenefitList = handleTempPolicyBenefitList({
      claimProcessData,
      claimEntities,
      beneficiaryPayableTypeMap,
      policyOwnerListMap,
    });

    // 根据tempPolicyBenefitList和oldPolicyBenefitList生成新的policyBenefitList
    handleNewPolicyBenefitList({ claimProcessData, claimEntities, tempPolicyBenefitList });

    // 遍历policyBenefitList，为新添加的Item的填充beneficiaryList
    handleBeneficicayList({
      claimProcessData,
      claimEntities,
      policyBeneficiaryListMap,
      policyInsuredListMap,
    });
  } else {
    claimProcessData.policyBenefitList = [];
  }
};

const getAllBeneficiaryList = (policyBenefitList, claimEntities) => {
  let allBeneficiaryListId = [];
  const allBeneficiaryList = [];
  // 汇总所有policy benefit中的beneficiary
  forEach(policyBenefitList, (policyBenefitItemId) => {
    const { beneficiaryList } = claimEntities.policyBenefitListMap[policyBenefitItemId];
    if (isArray(beneficiaryList) && beneficiaryList.length) {
      allBeneficiaryListId = concat(allBeneficiaryListId, beneficiaryList);
    }
  });
  forEach(allBeneficiaryListId, (beneficiaryItemId) => {
    allBeneficiaryList.push(claimEntities.beneficiaryListMap[beneficiaryItemId]);
  });
  return allBeneficiaryList;
};
// 更新payeeList数据
export const updatPayeeList = (claimProcessData, claimEntities) => {
  if (isEmpty(claimProcessData) || isEmpty(claimEntities)) {
    return;
  }
  const { policyBenefitList, payeeList } = claimProcessData;
  if (
    isArray(policyBenefitList) &&
    policyBenefitList.length &&
    isArray(payeeList) &&
    payeeList.length
  ) {
    // 汇总所有policy benefit中的beneficiary
    const allBeneficiaryList = getAllBeneficiaryList(policyBenefitList, claimEntities);
    const allBeneficiaryListValue = cleanFieldsMeta(allBeneficiaryList);
    const payeeGrouped = groupBy(allBeneficiaryListValue, 'payeeId');
    const payeeGroupedList = Object.entries(payeeGrouped);
    const payeeAmountListMap = {};
    forEach(payeeGroupedList, (groupItem) => {
      let payeePaymentAmount = 0;
      forEach(groupItem[1], (beneficiaryItem) => {
        payeePaymentAmount = add(payeePaymentAmount, beneficiaryItem.beneficiaryAmount);
      });
      payeeAmountListMap[groupItem[0]] = payeePaymentAmount;
    });
    forEach(payeeList, (payeeItemId) => {
      claimEntities.payeeListMap[payeeItemId].paymentAmount = null;
      if (isNumber(payeeAmountListMap[payeeItemId])) {
        claimEntities.payeeListMap[payeeItemId].paymentAmount = payeeAmountListMap[payeeItemId];
      }
    });
  } else {
    forEach(compact(payeeList), (payeeItemId) => {
      claimEntities.payeeListMap[payeeItemId].paymentAmount = null;
    });
  }
};
