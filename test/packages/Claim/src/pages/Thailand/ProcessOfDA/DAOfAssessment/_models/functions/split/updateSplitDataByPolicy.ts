import { cloneDeep, isPlainObject } from 'lodash';
import assureIncidentsFromClaimPayable from './assureIncidentsFromClaimPayable';
import assurePolicyBenefit from './assurePolicyBenefit';

export default (postData: any = {}) => {
  if (!isPlainObject(postData)) return postData;
  const { newCase, originalCase } = postData;

  const tempOriginalCase = cloneDeep(originalCase);
  const tempNewCase = cloneDeep(newCase);

  const {
    incidentList: incidentListOriginalCase,
    claimPayableList: claimPayableListOriginalCase,
    policyBenefitList: policyBenefitListOriginalCase,
  } = tempOriginalCase;

  const {
    incidentList: incidentListNewCase,
    claimPayableList: claimPayableListNewCase,
    policyBenefitList: policyBenefitListNewCase,
  } = tempNewCase;

  // 确定original case的ncident list
  tempOriginalCase.incidentList = assureIncidentsFromClaimPayable(
    claimPayableListOriginalCase,
    incidentListOriginalCase
  );

  // 确定original case的policy Benefit List
  tempOriginalCase.policyBenefitList = assurePolicyBenefit(
    claimPayableListOriginalCase,
    policyBenefitListOriginalCase
  );

  // 确定new case的incident list
  tempNewCase.incidentList = assureIncidentsFromClaimPayable(
    claimPayableListNewCase,
    incidentListNewCase
  );

  // 确定new case的policy Benefit List
  tempNewCase.policyBenefitList = assurePolicyBenefit(
    claimPayableListNewCase,
    policyBenefitListNewCase
  );

  return {
    ...postData,
    newCase: tempNewCase,
    originalCase: tempOriginalCase,
  };
};
