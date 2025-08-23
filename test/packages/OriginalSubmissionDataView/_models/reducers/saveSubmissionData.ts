import lodash from 'lodash';
import { produce }  from 'immer';

export default (state: any, action: any) => {
  const submissionData = lodash.get(action, 'payload.submissionData', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'submissionData', submissionData);
  });
  return {
    ...nextState,
  };
};
