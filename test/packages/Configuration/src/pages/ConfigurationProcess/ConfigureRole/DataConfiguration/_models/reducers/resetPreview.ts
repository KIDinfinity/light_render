import { produce } from 'immer';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.previewRecord = {};
    draftState.userGroupList = [];
    draftState.roleList = [];
  });
  return nextState;
};
