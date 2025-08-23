import { produce } from 'immer';

const saveToolsPermissions = (state: any, action: any) => {
  const { taskDetail } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.taskDetail = taskDetail;
  });
  return { ...nextState };
};

export default saveToolsPermissions;
