import { cloneDeep, isPlainObject, compact } from 'lodash';
import getIncidentsFromClaimPayable from './getIncidentsFromClaimPayable';
import { updatePolicyBenefit } from './updatePolicyBenefit';
import { getExpectPolicies, transExpectInfoFromListPolicy } from './handleExpectPolicy';
import { filterByClaimPayable, diffDecisinFromTarget } from './handleExpectDecision';

export default (postData: any = {}, listPolicies: any[]) => {
  if (!isPlainObject(postData)) return postData;
  const { newCase, originalCase } = postData;
  const originExpectPolicy = compact(originalCase.expectPolicyList);

  const tempOriginalCase = cloneDeep(originalCase);
  const tempNewCase = cloneDeep(newCase);

  const {
    incidentList: incidentListOriginalCase,
    claimPayableList: claimPayableListOriginalCase,
    expectDecisionList: expectDecisionListOriginCase,
    parentClaimNo,
    claimNo,
  } = tempOriginalCase;

  const {
    incidentList: incidentListNewCase,
    claimPayableList: claimPayableListNewCase,
    expectDecisionList: expectDecisionListNewCase,
  } = tempNewCase;

  // 确定original case的ncident list
  tempOriginalCase.incidentList = getIncidentsFromClaimPayable(
    claimPayableListOriginalCase,
    incidentListOriginalCase
  );

  // 确定new case的incident list
  tempNewCase.incidentList = getIncidentsFromClaimPayable(
    claimPayableListNewCase,
    incidentListNewCase
  );

  const expectDecisionNewCase = filterByClaimPayable(
    claimPayableListNewCase,
    expectDecisionListNewCase
  );

  tempOriginalCase.expectPolicyList = originExpectPolicy.concat(
    getExpectPolicies(claimPayableListNewCase, parentClaimNo)
  );
  tempOriginalCase.expectDecisionList = diffDecisinFromTarget(
    expectDecisionListOriginCase,
    expectDecisionNewCase
  );
  // 拆分原case的policy benefit
  tempOriginalCase.policyBenefitList = updatePolicyBenefit(
    tempOriginalCase.policyBenefitList,
    claimPayableListOriginalCase
  );

  // 新case中除了拆过来的payable对应的policyNo都要添加到expect policy的数据
  /**
   * 从list policy中查到新case中payable对应的policy No.的差集
   */
  const expectInfoPayables = transExpectInfoFromListPolicy(
    listPolicies,
    claimPayableListNewCase,
    claimNo
  );
  tempNewCase.expectPolicyList = originExpectPolicy.concat(
    getExpectPolicies(expectInfoPayables, parentClaimNo)
  );
  tempNewCase.expectDecisionList = expectDecisionNewCase;
  // 拆分新case的policy benefit
  tempNewCase.policyBenefitList = updatePolicyBenefit(
    tempNewCase.policyBenefitList,
    claimPayableListNewCase
  );

  return {
    ...postData,
    newCase: tempNewCase,
    originalCase: tempOriginalCase,
  };
};
