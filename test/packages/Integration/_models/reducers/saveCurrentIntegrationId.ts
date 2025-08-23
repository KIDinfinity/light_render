import { produce } from 'immer';

const saveCurrentIntegrationId = (state: any, action: any) => {
  const { currentIntegrationId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.currentIntegrationId = currentIntegrationId;
  });
  return { ...nextState };
};

export default saveCurrentIntegrationId;
