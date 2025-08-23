import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { netPremium } = lodash.pick(action?.payload, ['netPremium']);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList[0].netPremium', netPremium);
  });
  return {
    ...nextState,
  };
};
