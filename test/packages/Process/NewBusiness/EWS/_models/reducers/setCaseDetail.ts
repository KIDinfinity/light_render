import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const caseDetail = lodash.get(action, 'payload.caseDetail', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'caseDetail', caseDetail);
  });
  return {
    ...nextState,
  };
};
