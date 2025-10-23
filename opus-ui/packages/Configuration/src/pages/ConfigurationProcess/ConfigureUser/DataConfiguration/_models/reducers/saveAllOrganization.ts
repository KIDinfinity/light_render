import { produce } from 'immer';

export default (state: any, action: any) => {
  const { allOrganization } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.allOrganization = allOrganization;
  });
  return nextState;
};
