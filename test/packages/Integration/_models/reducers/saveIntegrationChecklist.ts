import { produce } from 'immer';

const saveIntegrationChecklist = (state: any, action: any) => {
  const { integrationChecklist } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.integrationChecklist = integrationChecklist;
    draftState.init = true;
  });
  return { ...nextState };
};

export default saveIntegrationChecklist;
