import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { errorId, field } = action.payload || {};
  const target = action?.target;
  if (!errorId && !target) return state;
  const changedFieldKey = `${errorId}_${target}_${field}`;

  const nextState = produce(state, (draftState: any) => {
    const { errorLog } = draftState;
    const errors = { ...errorLog.errors };

    if (errors[changedFieldKey]) {
      delete errors[changedFieldKey];
    }
    const finalErrors = { ...errors };
    lodash.set(draftState, 'errorLog.errors', finalErrors);
    lodash.set(draftState, 'errorLog.errorCount', lodash.size(finalErrors));
  });
  return {
    ...nextState,
  };
};
