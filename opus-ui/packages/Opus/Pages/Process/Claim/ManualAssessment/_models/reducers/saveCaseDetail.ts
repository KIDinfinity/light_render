import { produce } from 'immer';

const saveDecisionMapping = (state: any, action: any) => {
  const { caseDetail } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.caseDetail = caseDetail;
  });

  return { ...nextState };
};

export default saveDecisionMapping;
