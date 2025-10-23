import lodash from 'lodash';
// import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

const validateClaimDecision = (prestate: any) => {
  const state = lodash.cloneDeep(prestate);
  const { incidentDecisionListMap } = state.claimEntities;
  let decisionValue = '';
  lodash.forEach(incidentDecisionListMap, (decisionItem) => {
    const { decision } = decisionItem;
    if (formUtils.queryValue(decision) === 'A') {
      decisionValue = 'A';
    }
  });
  const assessmentDecision = lodash.get(state.claimProcessData, 'claimDecision.assessmentDecision');

  if (decisionValue === 'A' && formUtils.queryValue(assessmentDecision) === 'A') {
    state.claimProcessData.claimDecision.assessmentDecision = 'A';
  }
  return state;
};

export default validateClaimDecision;
