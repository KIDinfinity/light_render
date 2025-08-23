import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const coverageList = lodash.get(action, 'payload.coverageList', []);
  const newState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList[0].coverageList', coverageList);
  });
  return {
    ...newState,
  };
};
