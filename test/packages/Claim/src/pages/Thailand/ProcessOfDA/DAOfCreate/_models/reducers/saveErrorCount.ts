import { produce } from 'immer';

const saveErrorCount = (state: any, action: any) => {
  const { errorCount } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.errorCount = errorCount;
  });
  return { ...nextState };
};

export default saveErrorCount;
