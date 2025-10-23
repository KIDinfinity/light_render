import { cloneDeep, isPlainObject } from 'lodash';
import getClaimPayableFromIncidents from './getClaimPayableFromIncidents';
import { updatePolicyBenefit } from './updatePolicyBenefit';
import {
  diffDecisinFromTarget,
  findBenefitRelation,
  filterByBenefitClaimTypes,
  getSameIncidentIds,
  getDiffIncidentIds,
  filterNoImplementDecisions,
} from './handleExpectDecision';

export default (postData: any = {}) => {
  if (!isPlainObject(postData)) return postData;
  const { newCase, originalCase } = postData;

  const tempOriginalCase = cloneDeep(originalCase);
  const tempNewCase = cloneDeep(newCase);

  const {
    incidentList: incidentListOriginalCase,
    claimPayableList: claimPayableListOriginalCase,
    expectDecisionList: expectDecisionListOriginCase,
    benefitClaimTypeRelationList: benefitRealtionsOriginCase,
  } = tempOriginalCase;

  const {
    incidentList: incidentListNewCase,
    claimPayableList: claimPayableListNewCase,
    expectDecisionList: expectDecisionListNewCase,
  } = tempNewCase;

  // 确定original case的claimPayableList
  tempOriginalCase.claimPayableList = getClaimPayableFromIncidents(
    claimPayableListOriginalCase,
    incidentListOriginalCase
  );
  // 确定new case的claimPayableList
  tempNewCase.claimPayableList = getClaimPayableFromIncidents(
    claimPayableListNewCase,
    incidentListNewCase
  );

  /**
   * 处理拆分后的新旧case的expect decision数据业务逻辑步骤
   *
   * 1.根据拆分出来incident的claim type和benefit的关系找出所有incident和benefit关系
   *
   * 2.调用filterByBenefitClaimTypes方法找到新case的expect decision数据，并赋值给新case
   *   对于RCS未配置保单：
   *      整体拆分：
   *          origin case --->remove
   *          new case --->copy
   *      部分拆分：
   *          origin case --->remain
   *          new case --->copy
   * 3.在原case中过滤掉新case的expect decision数据，并赋值给原case
   *
   */

  // 1'
  const benefitRelations = findBenefitRelation(incidentListNewCase, benefitRealtionsOriginCase);
  // 2'
  // RCS已配置
  const expectDecisionNewCase = filterByBenefitClaimTypes(
    benefitRelations,
    expectDecisionListNewCase
  );
  // RCS未配置
  const partIds = getSameIncidentIds(incidentListOriginalCase, incidentListNewCase);
  const overallIds = getDiffIncidentIds(incidentListNewCase, partIds);
  const { overall, part } = filterNoImplementDecisions(
    expectDecisionListNewCase,
    overallIds,
    partIds
  );
  // 3'
  tempOriginalCase.expectDecisionList = diffDecisinFromTarget(
    expectDecisionListOriginCase,
    overall.concat(expectDecisionNewCase)
  );
  // 拆分原case的policy benefit
  tempOriginalCase.policyBenefitList = updatePolicyBenefit(
    tempOriginalCase.policyBenefitList,
    tempOriginalCase.claimPayableList
  );

  tempNewCase.expectDecisionList = [...overall, ...part].concat(expectDecisionNewCase);
  // 拆分新case的policy benefit
  tempNewCase.policyBenefitList = updatePolicyBenefit(
    tempNewCase.policyBenefitList,
    tempNewCase.claimPayableList
  );

  return {
    ...postData,
    newCase: tempNewCase,
    originalCase: tempOriginalCase,
  };
};
