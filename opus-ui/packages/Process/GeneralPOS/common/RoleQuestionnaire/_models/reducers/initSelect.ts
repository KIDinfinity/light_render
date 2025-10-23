import { produce } from 'immer';

const saveSelectClient = (state: any, action: any) => {
  const { selectClient, selectQuestionnaire } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.selectClient = selectClient;
    draftState.selectQuestionnaire = selectQuestionnaire;
  });

  return { ...nextState };
};

export default saveSelectClient;
