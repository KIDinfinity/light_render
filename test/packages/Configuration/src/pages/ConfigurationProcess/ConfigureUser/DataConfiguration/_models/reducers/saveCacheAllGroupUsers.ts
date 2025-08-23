import { produce } from 'immer';


export default (state: any, action: any) => {
  const {allGroupUsers={}}= action?.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.allGroupUsers = allGroupUsers
  });
  return nextState;
};
