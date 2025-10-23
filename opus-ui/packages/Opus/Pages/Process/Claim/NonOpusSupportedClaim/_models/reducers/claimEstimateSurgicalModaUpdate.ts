import { produce } from 'immer';

const claimEstimateSurgicalModaUpdate = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEstimateSurgicalModal = {
      ...draftState.claimEstimateSurgicalModal,
      ...action.payload,
    };
  });

  return { ...nextState };
};

export default claimEstimateSurgicalModaUpdate;
