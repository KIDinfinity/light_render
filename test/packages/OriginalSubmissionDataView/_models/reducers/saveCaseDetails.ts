import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const caseInfo = lodash.get(action, 'payload.caseInfo', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'caseInfo', caseInfo);
  });
  return {
    ...nextState,
  };
};
