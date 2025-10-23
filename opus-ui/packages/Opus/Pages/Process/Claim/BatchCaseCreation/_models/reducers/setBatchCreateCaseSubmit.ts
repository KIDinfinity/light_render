import { produce } from 'immer';

const setBatchCreateCaseSubmit = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.batchCreateCaseSubmit = action?.payload || {};
  });
  return { ...nextState };
};

export default setBatchCreateCaseSubmit;
