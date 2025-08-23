import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const currentActivityKey = lodash.get(action, 'payload.currentActivityKey', '');
  const caseStatus = lodash.get(action, 'payload.caseStatus', '');

  const nextState = produce(state, (draftState: any) => {
    draftState.caseStatus = lodash.isEmpty(currentActivityKey) ? caseStatus : null;
  });
  return {
    ...nextState,
  };
};
