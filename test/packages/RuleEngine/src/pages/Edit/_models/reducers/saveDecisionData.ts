import { produce }  from 'immer';

const saveDecisionData = (state: any, action: any) => {
  const { decisionEditData } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData = decisionEditData;
  });

  return { ...nextState };
};

export default saveDecisionData;
