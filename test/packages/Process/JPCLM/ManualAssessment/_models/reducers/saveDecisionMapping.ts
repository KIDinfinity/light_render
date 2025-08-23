import { produce }  from 'immer';

const saveDecisionMapping = (state: any, action: any) => {
  const { claimProcessData } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.decisionMapping = claimProcessData;
  });

  return { ...nextState };
};

export default saveDecisionMapping;
