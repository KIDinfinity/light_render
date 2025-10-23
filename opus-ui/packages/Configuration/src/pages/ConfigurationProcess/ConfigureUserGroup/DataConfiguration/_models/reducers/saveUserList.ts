import { produce } from 'immer';

export default (state: any, action: any) => {
  const { userList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.userList = userList;
  });
  return nextState;
};
