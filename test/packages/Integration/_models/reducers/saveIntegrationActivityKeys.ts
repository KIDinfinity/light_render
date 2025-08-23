import { produce } from 'immer';

const saveIntegrationActivityKeys = (state: any, action: any) => {
  const { integrationActivityKeys } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.integrationActivityKeys = integrationActivityKeys;
  });
  return { ...nextState };
};

export default saveIntegrationActivityKeys;
