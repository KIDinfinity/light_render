import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const checkduplicateData = lodash.get(action, 'payload.checkduplicateData');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData', checkduplicateData);
  });
  return {
    ...nextState,
  };
};
