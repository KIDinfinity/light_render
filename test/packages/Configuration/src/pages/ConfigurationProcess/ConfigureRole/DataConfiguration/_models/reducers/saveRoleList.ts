import { produce } from 'immer';

export default (state: any, action: any) => {
  const { roleList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.roleList = roleList;
  });
  return nextState;
};
