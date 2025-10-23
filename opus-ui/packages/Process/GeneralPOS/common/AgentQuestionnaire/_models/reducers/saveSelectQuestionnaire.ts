import { produce } from 'immer';

const saveSelectQuestionnaire = (state: any, action: any) => {
  const { selectQuestionnaire } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.selectQuestionnaire = selectQuestionnaire;
  });

  return { ...nextState };
};

export default saveSelectQuestionnaire;
