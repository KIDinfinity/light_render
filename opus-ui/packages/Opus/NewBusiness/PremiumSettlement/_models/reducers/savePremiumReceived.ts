import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList[0].premiumReceived', payload?.premiumReceived);
  });
  return {
    ...nextState,
  };
};
