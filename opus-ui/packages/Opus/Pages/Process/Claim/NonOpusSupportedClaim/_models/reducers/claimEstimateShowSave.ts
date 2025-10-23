import { produce } from 'immer';

const claimEstimateShowSave = (state: any, action: any) => {
  const { show } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEstimateShow = show;
  });

  return { ...nextState };
};

export default claimEstimateShowSave;
