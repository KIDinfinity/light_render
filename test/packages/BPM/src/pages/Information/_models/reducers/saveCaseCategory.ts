import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const caseCategory = lodash.get(action, 'payload.caseCategory', '')
  const nextState = produce(state, (draftState: any) => {
    draftState.caseCategory = caseCategory;
  });
  return {
    ...nextState,
  };
};
