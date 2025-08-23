import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, errorId } = action.payload || {};
  const target = action?.target;
  if (!errorId && !target) return state;
  const newErrors = lodash.reduce(
    changedFields,
    (result, value, key) => {
      if (value?.errors) {
        lodash.set(result, `${errorId}_${target}_${key}`, value.errors);
      }
      return result;
    },
    {}
  );
  const changedFieldsKey = lodash.keys(changedFields).map((key) => `${errorId}_${target}_${key}`);

  const nextState = produce(state, (draftState: any) => {
    const { errorLog } = draftState;
    const errors = { ...errorLog.errors };

    lodash.forEach(changedFieldsKey, (key) => {
      if (errors[key]) {
        delete errors[key];
      }
    });
    const finalErrors = { ...errors, ...newErrors };
    lodash.set(draftState, 'errorLog.errors', finalErrors);
    lodash.set(draftState, 'errorLog.errorCount', lodash.size(finalErrors));
  });
  return {
    ...nextState,
  };
};
