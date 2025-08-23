/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
import { map, isArray, filter, forEach, isPlainObject, compact, chain } from 'lodash';
import { BenefitCategory, SwitchEnum } from 'claim/pages/utils/claim';
import { EXPECTDECISION } from 'claim/pages/utils/claimConstant';
// import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import {
  updateDecision,
  deleteDecision,
  filterDecision,
} from 'claim/pages/Japan/ProcessOfJPCLM/utils/expectDecisionUtils';
import type {
  ExpectDecision} from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import {
  PolicySetupStatus,
  ExpectDecisionOperation,
} from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';

const EXCLUDE = ExpectDecisionOperation.Exclude;
const INCLUDE = ExpectDecisionOperation.Include;

// 根据claimPayable生成expectDecision数据
const getDecisionForClaimPayable = (claimPayableItem: any, operation?: string) => {
  const {
    benefitTypeCode,
    claimDecision,
    claimNo,
    incidentId,
    policyCategory,
    policyNo,
    policySetupStatus,
    productCode,
    assessorOverrideAmount,
    benefitCategory,
    paymentAcceptedResult,
    assessmentResult,
    mainProductCode,
    paymentAssessmentResult,
  } = claimPayableItem;
  return {
    ...EXPECTDECISION,
    assessObjectId: incidentId,
    claimNo,
    incidentId,
    claimDecision,
    policyCategory,
    policySetupStatus,
    policyId: policyNo,
    productCode,
    benefitTypeCode,
    assessorOverrideAmount,
    operation,
    benefitCategory,
    paymentAcceptedResult,
    assessmentResult,
    mainProductCode,
    paymentAssessmentResult,
  };
};

// 根据claimPayable和lifePayable生成expectDecision数据
const getDecisionForLife = (claimPayableItem: any, operation?: string) => {
  const {
    benefitTypeCode,
    claimDecision,
    claimNo,
    incidentId,
    lifePayable = {},
    policyCategory,
    policyNo,
    policySetupStatus,
    productCode,
    benefitCategory,
    paymentAcceptedResult,
    assessmentResult,
    mainProductCode,
    paymentAssessmentResult,
  } = claimPayableItem;
  const { benefitItemCode, assessorOverrideAmount, assessorOverrideMultiple } = lifePayable;
  return {
    ...EXPECTDECISION,
    assessObjectId: incidentId,
    claimNo,
    incidentId,
    claimDecision,
    policyCategory,
    policySetupStatus,
    policyId: policyNo,
    productCode,
    benefitTypeCode,
    benefitItemCode,
    assessorOverrideAmount,
    assessorOverrideMultiple,
    operation,
    benefitCategory,
    paymentAcceptedResult,
    assessmentResult,
    mainProductCode,
    paymentAssessmentResult,
  };
};

// 根据claimPayable和treatmentPayable生成expectDecision数据
const getDecisionForTreatment = (
  claimPayableItem: any,
  treatmentPayableItem: any,
  operation?: string
) => {
  const {
    claimDecision,
    policyCategory,
    policySetupStatus,
    benefitCategory,
    paymentAcceptedResult,
    assessmentResult,
    mainProductCode,
    paymentAssessmentResult,
  } = claimPayableItem;
  const {
    assessorOverrideAmount,
    assessorOverrideDays,
    assessorOverrideDeductible,
    assessorOverrideMultiple,
    benefitItemCode,
    benefitTypeCode,
    claimNo,
    incidentId,
    treatmentId,
    policyNo,
    productCode,
  } = treatmentPayableItem;
  return {
    ...EXPECTDECISION,
    assessObjectId: treatmentId,
    claimNo,
    incidentId,
    treatmentId,
    claimDecision,
    policyCategory,
    policySetupStatus,
    policyId: policyNo,
    productCode,
    benefitTypeCode,
    benefitItemCode,
    assessorOverrideDays,
    assessorOverrideAmount,
    assessorOverrideMultiple,
    assessorOverrideDeductible,
    operation,
    benefitCategory,
    paymentAcceptedResult,
    assessmentResult,
    mainProductCode,
    paymentAssessmentResult,
  };
};

/**
 * 过滤claim payable下的treatment payable产生的expect decision数据
 * @param expectDecisionList
 * @param claimPayable
 */
export const filterDecisionByTreatmentPayable = (
  expectDecisionList: ExpectDecision[] = [],
  claimPayable: any,
  treatmentPayable: any
) => {
  if (!isArray(expectDecisionList) || !isPlainObject(claimPayable)) return [];
  return filterDecision(
    expectDecisionList,
    getDecisionForTreatment(claimPayable, treatmentPayable)
  );
};

/**
 * 过滤由claim payable 产生的expect decision数据
 * @param expectDecisionList
 * @param claimPayable
 */
export const filterDecisionByClaimPayable = (
  expectDecisionList: ExpectDecision[] = [],
  claimPayable: any
) => {
  if (!isArray(expectDecisionList) || !isPlainObject(claimPayable)) return [];
  const { treatmentPayableList } = claimPayable;
  if (compact(treatmentPayableList).length > 0) {
    return map(treatmentPayableList, (treatmentPayable) =>
      filterDecisionByTreatmentPayable(expectDecisionList, claimPayable, treatmentPayable)
    );
  }
  return filterDecision(expectDecisionList, getDecisionForClaimPayable(claimPayable));
};

/**
 * 过滤life payable产生的expect decision数据
 * @param expectDecisionList
 * @param claimPayable
 */
export const filterDecisionByLifePayable = (
  expectDecisionList: ExpectDecision[] = [],
  claimPayable: any
) => {
  if (!isArray(expectDecisionList) || !isPlainObject(claimPayable)) return [];
  return filterDecision(expectDecisionList, getDecisionForLife(claimPayable));
};

/**
 * 根据claimpayables过滤expect decision数据
 * @param expectDecisionList
 * @param claimPayables
 */
export const filterDecisionByClaimPayables = (
  expectDecisionList: ExpectDecision[] = [],
  claimPayables: any[] = []
) => {
  if (!isArray(expectDecisionList) || !isArray(claimPayables)) return [];
  return chain(claimPayables)
    .map((claimPayable: any) => {
      const { benefitCategory } = claimPayable;
      switch (benefitCategory) {
        case BenefitCategory.life:
          return filterDecisionByLifePayable(expectDecisionList, claimPayable);
        case BenefitCategory.cashless:
          return filterDecisionByClaimPayable(expectDecisionList, claimPayable);
        case BenefitCategory.reimbursement:
          return filterDecisionByClaimPayable(expectDecisionList, claimPayable);
        default:
          return filterDecisionByClaimPayable(expectDecisionList, claimPayable);
      }
    })
    .flatMapDeep()
    .compact()
    .value();
};

// --------------------------------------删除payable时更新expectDecision
/**
 * 删除lifePayable层级对应的expectDecision
 * 针对RCS配置的寿险保单
 */
export const deleteDecisionForLifePayable = (claimProcessData: any, claimPayableItem: any) => {
  const expectDecision: ExpectDecision = getDecisionForLife(claimPayableItem, EXCLUDE);
  if (claimPayableItem.manualAdd === SwitchEnum.YES) {
    claimProcessData.expectDecisionList = deleteDecision(
      claimProcessData.expectDecisionList,
      expectDecision
    );
  } else {
    claimProcessData.expectDecisionList = updateDecision(
      claimProcessData.expectDecisionList,
      expectDecision
    );
  }
};

/**
 * 删除treatmentPayable层级对应的expectDecision
 * 针对RCS配置的补偿型和津贴型保单以及RCS未配置的保单
 */
const deleteDecisionForTreatmentPayableItem = (
  claimProcessData: any,
  claimPayableItem: any,
  treatmentPayableItem: any
) => {
  const expectDecision: ExpectDecision = getDecisionForTreatment(
    claimPayableItem,
    treatmentPayableItem,
    EXCLUDE
  );
  if (treatmentPayableItem.manualAdd === SwitchEnum.YES) {
    claimProcessData.expectDecisionList = deleteDecision(
      claimProcessData.expectDecisionList,
      expectDecision
    );
  } else {
    claimProcessData.expectDecisionList = updateDecision(
      claimProcessData.expectDecisionList,
      expectDecision
    );
  }
};

/**
 * 删除treatmentPayableList层级的expectDecision
 * 针对RCS配置的补偿型和津贴型保单以及RCS未配置的保单
 */
const deleteDecisionForTreatmentPayableList = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItem: any
) => {
  const { treatmentPayableList } = claimPayableItem;
  if (isArray(treatmentPayableList) && treatmentPayableList.length) {
    map(treatmentPayableList, (treatmentPayableId) => {
      deleteDecisionForTreatmentPayableItem(
        claimProcessData,
        claimPayableItem,
        claimEntities.treatmentPayableListMap[treatmentPayableId]
      );
    });
  }
};

/**
 * 删除claimPayable层级对应的expectDecision
 * 针对无效契约和RCS未配置的保单
 */
const deleteDecisionForClaimPayable = (claimProcessData: any, claimPayableItem: any) => {
  const expectDecision: ExpectDecision = getDecisionForClaimPayable(claimPayableItem, EXCLUDE);
  if (claimPayableItem.manualAdd === SwitchEnum.YES) {
    claimProcessData.expectDecisionList = deleteDecision(
      claimProcessData.expectDecisionList,
      expectDecision
    );
  } else {
    claimProcessData.expectDecisionList = updateDecision(
      claimProcessData.expectDecisionList,
      expectDecision
    );
  }
};

/**
 * 针对无效契约和RCS未配置的保单
 * 有treatmentPayable则删除treatmentPayable对应的expectDecision
 * 没有treatmentPayable则删除claimPayable对应的expectDecision
 */
const deleteDecisionForNoImplementPayable = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItem: any
) => {
  const { treatmentPayableList } = claimPayableItem;

  // 当存在treatment Payable时
  if (isArray(treatmentPayableList) && treatmentPayableList.length) {
    deleteDecisionForTreatmentPayableList(claimProcessData, claimEntities, claimPayableItem);
  }
  deleteDecisionForClaimPayable(claimProcessData, claimPayableItem);
};

/**
 * 除RCS配置以外的契约,是无效契约和RCS未配置
 */
const deleteDecisionForNoStandard = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItem: any
) => {
  const { policySetupStatus } = claimPayableItem;

  switch (policySetupStatus) {
    case PolicySetupStatus.NoImplement:
      // 判断是RCS未配置的保单
      deleteDecisionForNoImplementPayable(claimProcessData, claimEntities, claimPayableItem);
      break;
    case PolicySetupStatus.NoBelong:
      // 判断是无效契约
      deleteDecisionForClaimPayable(claimProcessData, claimPayableItem);
      break;
    case PolicySetupStatus.Standard:
      deleteDecisionForClaimPayable(claimProcessData, claimPayableItem);
      break;
    default:
      deleteDecisionForClaimPayable(claimProcessData, claimPayableItem);
  }
};

// 删除claimPayable时更新expectDecisionList
export const updateExpectDecisionForDeleteClaimPayable = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItem: any
) => {
  const { benefitCategory } = claimPayableItem;
  switch (benefitCategory) {
    case BenefitCategory.life:
      deleteDecisionForLifePayable(claimProcessData, claimPayableItem);
      break;
    case BenefitCategory.cashless:
      deleteDecisionForTreatmentPayableList(claimProcessData, claimEntities, claimPayableItem);
      break;
    case BenefitCategory.reimbursement:
      deleteDecisionForTreatmentPayableList(claimProcessData, claimEntities, claimPayableItem);
      break;
    default:
      deleteDecisionForNoStandard(claimProcessData, claimEntities, claimPayableItem);
  }
};

// 删除claimPayable时更新expectDecisionList
export const removeClaimPayableItemExpectDecision = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItemId: string
) => {
  const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
  updateExpectDecisionForDeleteClaimPayable(claimProcessData, claimEntities, claimPayableItem);
};

// 删除incident时更新incident对应的claimPayable的expectDecisionList
export const removeIncidentItemExpectDecision = (
  claimProcessData: any,
  claimEntities: any,
  incidentId: string
) => {
  const claimPayableList = filter(
    claimEntities.claimPayableListMap,
    (claimPayableItem) => claimPayableItem.incidentId === incidentId
  );

  forEach(claimPayableList, (claimPayableItem) =>
    updateExpectDecisionForDeleteClaimPayable(claimProcessData, claimEntities, claimPayableItem)
  );
};

// 删除treatmentPayable时更新expectDecisionList
export const removeTreatmentPayableItemExpectDecision = (
  claimProcessData: any,
  claimEntities: any,
  treatmentPayableItemId: string
) => {
  const treatmentPayableItem = claimEntities.treatmentPayableListMap[treatmentPayableItemId];
  const claimPayableItem = claimEntities.claimPayableListMap[treatmentPayableItem.payableId];

  deleteDecisionForTreatmentPayableItem(claimProcessData, claimPayableItem, treatmentPayableItem);
};

// 删除treatment时更新treatment对应的treatmentPayable的expectDecisionList
export const removeTreatmentItemExpectDecision = (
  claimProcessData: any,
  claimEntities: any,
  treatmentId: any
) => {
  const treatmentPayableList = filter(
    claimEntities.treatmentPayableListMap,
    (treatmentPayableItem) => treatmentPayableItem.treatmentId === treatmentId
  );

  forEach(treatmentPayableList, (treatmentPayableItem) => {
    const claimPayableItem = claimEntities.claimPayableListMap[treatmentPayableItem.payableId];
    deleteDecisionForTreatmentPayableItem(claimProcessData, claimPayableItem, treatmentPayableItem);
  });
};

// --------------------------------------修改payable时更新expectDecision
/**
 * 修改lifePayable层级对应的expectDecision
 * 针对RCS配置的寿险保单
 */
export const updateDecisionForLifePayable = (claimProcessData: any, claimPayableItem: any) => {
  const expectDecision: ExpectDecision = getDecisionForLife(claimPayableItem, INCLUDE);
  claimProcessData.expectDecisionList = updateDecision(
    claimProcessData.expectDecisionList,
    expectDecision
  );
};

/**
 * 更新treatmentPayable层级对应的expectDecision
 * 针对RCS配置的补偿型和津贴型保单以及RCS未配置的保单
 */
export const updateDecisionForTreatmentPayableItem = (
  claimProcessData: any,
  claimPayableItem: any,
  treatmentPayableItem: any
) => {
  const expectDecision: ExpectDecision = getDecisionForTreatment(
    claimPayableItem,
    treatmentPayableItem,
    INCLUDE
  );
  claimProcessData.expectDecisionList = updateDecision(
    claimProcessData.expectDecisionList,
    expectDecision
  );
};

/**
 * 更新treatmentPayableList层级的expectDecision
 * 针对RCS配置的补偿型和津贴型保单以及RCS未配置的保单
 */
const updateDecisionForTreatmentPayableList = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItem: any
) => {
  const { treatmentPayableList } = claimPayableItem;
  if (isArray(treatmentPayableList) && treatmentPayableList.length) {
    map(treatmentPayableList, (treatmentPayableId) => {
      updateDecisionForTreatmentPayableItem(
        claimProcessData,
        claimPayableItem,
        claimEntities.treatmentPayableListMap[treatmentPayableId]
      );
    });
  }
};

/**
 * 删除claimPayable层级对应的expectDecision
 * 针对无效契约和RCS未配置的保单
 */
const updateDecisionForClaimPayable = (claimProcessData: any, claimPayableItem: any) => {
  const expectDecision: ExpectDecision = getDecisionForClaimPayable(claimPayableItem, INCLUDE);
  claimProcessData.expectDecisionList = updateDecision(
    claimProcessData.expectDecisionList,
    expectDecision
  );
};

/**
 * 针对无效契约和RCS未配置的保单
 * 有treatmentPayable则修改treatmentPayable对应的expectDecision
 * 没有treatmentPayable则修改claimPayable对应的expectDecision
 */
const updateDecisionForNoImplementPayable = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItem: any
) => {
  const { treatmentPayableList } = claimPayableItem;

  // 当存在treatment Payable时
  if (isArray(treatmentPayableList) && treatmentPayableList.length) {
    updateDecisionForTreatmentPayableList(claimProcessData, claimEntities, claimPayableItem);
  } else {
    updateDecisionForClaimPayable(claimProcessData, claimPayableItem);
  }
};

/**
 * 修改的是除RCS配置以外的契约,是无效契约和RCS未配置
 */
const updateDecisionForNoStandard = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItem: any
) => {
  const { policySetupStatus } = claimPayableItem;

  if (policySetupStatus === PolicySetupStatus.NoImplement) {
    // 判断是RCS未配置的保单
    updateDecisionForNoImplementPayable(claimProcessData, claimEntities, claimPayableItem);
  }
};

// 修改claimPayable时更新expectDecisionList
export const updateExpectDecisionForUpdateClaimPayable = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItem: any
) => {
  const { benefitCategory } = claimPayableItem;

  switch (benefitCategory) {
    case BenefitCategory.life:
      updateDecisionForLifePayable(claimProcessData, claimPayableItem);
      break;
    case BenefitCategory.cashless:
      updateDecisionForTreatmentPayableList(claimProcessData, claimEntities, claimPayableItem);
      break;
    case BenefitCategory.reimbursement:
      updateDecisionForTreatmentPayableList(claimProcessData, claimEntities, claimPayableItem);
      break;
    default:
      updateDecisionForNoStandard(claimProcessData, claimEntities, claimPayableItem);
  }
};

// 修改claimPayable的証券番号时更新expectDecisionList
export const updateClaimPayable = (
  claimProcessData: any,
  claimEntities: any,
  claimPayableItem: any
) => {
  updateExpectDecisionForDeleteClaimPayable(claimProcessData, claimEntities, claimPayableItem);
};

// 修改claimPayable的証券番号时更新expectDecisionList
