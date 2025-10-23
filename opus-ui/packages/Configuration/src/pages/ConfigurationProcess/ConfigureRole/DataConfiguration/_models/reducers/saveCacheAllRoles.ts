import { produce } from 'immer';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.allRoleLists = { ...draftState.allRoleLists, ...action.payload.allRoleLists };
  });
  return nextState;
};
