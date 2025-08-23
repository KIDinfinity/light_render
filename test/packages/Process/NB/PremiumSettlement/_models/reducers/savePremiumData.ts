import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { premiumData } = lodash.pick(action.payload, ['premiumData']);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList[0]', {
      ...lodash.get(draftState, 'businessData.policyList[0]'),
      ...premiumData,
    });
  });
  return {
    ...nextState,
  };
};
