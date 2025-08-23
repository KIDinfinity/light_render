import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action, 'payload.changedFields', {});
  const nextState = produce(state, (draftState: any) => {
    const fecDecision = lodash.get(draftState, 'businessData.fecInfo.fecDecision', {});
    lodash.set(draftState, 'businessData.fecInfo.fecDecision', {
      ...fecDecision,
      ...changedFields,
    });
  });
  return {
    ...nextState,
  };
};
