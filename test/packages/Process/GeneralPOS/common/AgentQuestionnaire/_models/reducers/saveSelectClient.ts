import { produce } from 'immer';

const saveSelectClient = (state: any, action: any) => {
  const { selectClient } = action.payload;

  const nextState = produce(state, (draftState) => {
    const questionnaireKey = draftState.questionnaireKey;

    draftState.selectClient = selectClient;
    draftState.selectQuestionnaire = draftState.processData?.find(
      (item) => item.clientInfo[questionnaireKey] === selectClient
    )?.questionnaireList?.[0]?.questionnaireCode;
  });

  return { ...nextState };
};

export default saveSelectClient;
