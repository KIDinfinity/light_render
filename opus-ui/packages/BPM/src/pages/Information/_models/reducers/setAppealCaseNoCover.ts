import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const appealCaseNoCover = lodash.get(action, 'payload.appealCaseNoCover', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.appealCaseNoCover = appealCaseNoCover;
  });
  return {
    ...nextState,
  };
};
