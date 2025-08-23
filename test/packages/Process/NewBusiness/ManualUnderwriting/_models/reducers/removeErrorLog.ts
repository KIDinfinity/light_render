import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { paths = [] } = action.payload;
  const errorKey = lodash.join(paths, '_');
  const nextState = produce(state, (draftState: any) => {
    const { errorLog } = draftState;

    if (!lodash.isEmpty(errorLog.errors)) {
      const newErrors = lodash.pickBy(
        errorLog.errors,
        (_, key: string) => !lodash.startsWith(key, errorKey)
      );
      draftState.errorLog.errors = newErrors;
      draftState.errorLog.errorCount = lodash.size(newErrors);
    }
  });

  return {
    ...nextState,
  };
};
