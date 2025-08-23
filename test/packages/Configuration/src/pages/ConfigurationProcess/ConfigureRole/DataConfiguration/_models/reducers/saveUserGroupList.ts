import { produce } from 'immer';

export default (state: any, action: any) => {
  const { userGroupList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.userGroupList = userGroupList;
  });
  return nextState;
};
