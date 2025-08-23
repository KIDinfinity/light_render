import lodash from 'lodash';
// import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

const validateClaimDecision = (prestate: any) => {
  const state = lodash.cloneDeep(prestate);

  const { claimPayableListMap } = state.claimEntities;
  let decisionValue = '';
  lodash.forEach(claimPayableListMap, (item) => {
    const { claimDecision } = item;
    if (formUtils.queryValue(claimDecision) === 'A') {
      decisionValue = 'A';
    }
  });
  const assessmentDecision = lodash.get(state.claimProcessData, 'claimDecision.assessmentDecision');

  if (decisionValue === 'A' && formUtils.queryValue(assessmentDecision) === 'A') {
    if (assessmentDecision.errors) {
      state.claimProcessData.claimDecision.assessmentDecision = {
        ...assessmentDecision,
        value: 'A',
      };
    } else {
      state.claimProcessData.claimDecision.assessmentDecision = 'A';
    }
  }

  return state;
};

export default validateClaimDecision;
