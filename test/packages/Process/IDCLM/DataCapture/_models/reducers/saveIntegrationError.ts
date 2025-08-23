import { produce }  from 'immer';

const saveIntegrationError = (state: any, action: any) => {
  const { promptMessages } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.promptMessages = promptMessages;
  });

  return { ...nextState };
};

export default saveIntegrationError;
