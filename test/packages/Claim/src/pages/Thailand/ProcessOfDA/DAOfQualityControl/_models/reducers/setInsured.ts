import { produce } from 'immer';

const setInsured = (state: any, action: any) => {
  const insured = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.insured = {
      ...draftState.claimProcessData.insured,
      ...insured,
    };
  });

  return { ...nextState };
};

export default setInsured;
