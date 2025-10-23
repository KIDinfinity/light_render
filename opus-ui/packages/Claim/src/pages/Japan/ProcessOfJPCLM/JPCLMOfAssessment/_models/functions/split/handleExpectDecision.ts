import {
  isArray,
  isString,
  isEqual,
  chain,
  map,
  some,
  compact,
  filter,
  differenceWith,
  isPlainObject,
} from 'lodash';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
/**
 * 根据payable的incident id和policy no.找到expect decision数据
 * @param claimPayables
 * @param expectDecisions
 */
export const filterByClaimPayable = (claimPayables: any[], expectDecisions: any[]) => {
  if (!isArray(claimPayables) || !isArray(expectDecisions)) return [];
  return chain(claimPayables)
    .uniqBy('policyNo')
    .map((claimPayable: any) =>
      filter(expectDecisions, {
        policyId: claimPayable.policyNo,
      })
    )
    .flattenDeep()
    .compact()
    .value();
};

/**
 * 根据incident的claim type和benefit的关系找出所有incident和benefit的关系
 * @param incidentList
 * @param benefitClaimTypes incident的claim type 和benefit的关系数据
 */
export const findBenefitRelation = (incidentList: any[], benefitClaimTypes: any[]) => {
  if (!isArray(incidentList) || !isArray(benefitClaimTypes)) return [];
  return chain(incidentList)
    .map((incident: any) => {
      return filter(benefitClaimTypes, (item: any) =>
        compact(incident.claimTypeArray).includes(item.claimType)
      ).map((claimType: any) => ({ ...claimType, incidentId: incident.id }));
    })
    .flatten()
    .uniqWith(
      (prev: any, next: any) =>
        prev.incidentId === next.incidentId &&
        prev.benefitTypeCode === next.benefitTypeCode &&
        prev.benefitItemCode === next.benefitItemCode
    )
    .compact()
    .value();
};

/**
 * 根据incident和benefit关系找到被拆出来的incident对应的claim payable数据
 * @param benefitClaimTypes incident的claim type 和benefit的关系数据
 * @param claimPayables
 */
export const findClaimPayableByBenefitRelation = (
  benefitClaimTypes: any[],
  claimPayables: any[]
) => {
  if (!isArray(benefitClaimTypes) || !isArray(claimPayables)) return [];
  return chain(claimPayables)
    .filter((claimPayble: any) => {
      return some(
        benefitClaimTypes,
        (item: any) =>
          claimPayble.incidentId === item.incidentId &&
          claimPayble.benefitTypeCode === item.benefitTypeCode &&
          claimPayble.benefitItemCode === item.benefitItemCode
      );
    })
    .compact()
    .value();
};

/**
 * 根据claim type和benefit的关系找到expect decision数据（RCS已配置的情况）
 * @param expectDecisions 用户手动调整（修改或删除）payable的信息时记录的数据
 * @param benefitClaimType incident的claim type 和benefit的关系数据（RCS已配置的保单才有关系）
 */
export const filterDecisions = (expectDecisions: any[], benefitClaimType: any) => {
  if (!isArray(expectDecisions) || !isPlainObject(benefitClaimType)) return [];
  return filter(expectDecisions, (decision: any) => {
    const { incidentId, benefitTypeCode, benefitItemCode } = decision;
    const common =
      benefitClaimType.incidentId === incidentId &&
      benefitClaimType.benefitTypeCode === benefitTypeCode;

    return benefitItemCode
      ? common && benefitClaimType.benefitItemCode === benefitItemCode
      : common;
  });
};

/**
 * 根据claim type和benefit的关系找到expect decision数据（RCS已配置的情况）
 * @param benefitClaimTypes incident的claim type 和benefit的关系数据
 * @param expectDecisions
 */
export const filterByBenefitClaimTypes = (benefitClaimTypes: any[], expectDecisions: any[]) => {
  if (!isArray(benefitClaimTypes) || !isArray(expectDecisions)) return [];
  return chain(benefitClaimTypes)
    .map((benefitClaimType: any) => {
      return filterDecisions(expectDecisions, benefitClaimType);
    })
    .flattenDeep()
    .compact()
    .value();
};

/**
 * 获取源数据和目标数据的差异部分
 * @param decisionSource expect decision 源数据
 * @param decisionTarget expect decision 目标数据
 */
export const diffDecisinFromTarget = (decisionSource: any[] = [], decisionTarget: any[] = []) =>
  differenceWith(decisionSource, decisionTarget, isEqual);

/**
 * update expect decision数据的operation值
 * @param expectDecisions
 * @param operation
 */
export const updateExpectDecision = (expectDecisions: any[], operation: string) => {
  if (!isArray(expectDecisions) || !isString(operation)) return expectDecisions;
  return map(expectDecisions, (decision: any) => ({ ...decision, operation }));
};

/**
 * 获取新旧case都有的incident的id（即表示部分拆分）
 * @param incidentSource 旧case的incident集合
 * @param incidentTarget 新case的incident集合
 */
export const getSameIncidentIds = (incidentSource: any[], incidentTarget: any[]) => {
  if (!isArray(incidentSource) || !isArray(incidentTarget)) return [];
  return chain(incidentSource)
    .filter((source: any) => some(incidentTarget, (target: any) => target.id === source.id))
    .map((incident: any) => incident.id)
    .compact()
    .value();
};

/**
 * 获取整体被拆分的incident的id
 * @param incidents 新case的incident
 * @param incidendIds 部分拆分的incident的id
 */
export const getDiffIncidentIds = (incidents: any[], incidendIds: string[]) => {
  if (!isArray(incidents) || !isArray(incidendIds)) return [];
  return chain(incidents)
    .filter((incident: any) => !incidendIds.includes(incident.id))
    .map((incident: any) => incident.id)
    .compact()
    .value();
};

/**
 * 过滤RCS未配置的expect decision数据
 * @param expectDecisions expect decision数据
 * @param overallIds 整体被拆分的incident（新case而旧case没有的incident）的id
 * @param partIds 部分被拆分的incident（新旧case都有的incident）的id
 */
export const filterNoImplementDecisions = (
  expectDecisions: any[],
  overallIds: string[],
  partIds: string[]
) => {
  const overall: string[] = [];
  const part: string[] = [];
  if (!isArray(expectDecisions) || !isArray(overallIds) || !isArray(partIds))
    return { overall, part };
  return {
    overall: chain(expectDecisions)
      .filter(
        (decision: any) =>
          decision.policySetupStatus === PolicySetupStatus.NoImplement &&
          overallIds.includes(decision.incidentId)
      )
      .compact()
      .value(),
    part: chain(expectDecisions)
      .filter(
        (decision: any) =>
          decision.policySetupStatus === PolicySetupStatus.NoImplement &&
          partIds.includes(decision.incidentId)
      )
      .compact()
      .value(),
  };
};

export default {
  filterByClaimPayable,
  findBenefitRelation,
  diffDecisinFromTarget,
  filterByBenefitClaimTypes,
  findClaimPayableByBenefitRelation,
  getSameIncidentIds,
  getDiffIncidentIds,
  filterNoImplementDecisions,
};
