import { produce } from 'immer';

export default (state: any, action: any) => {
  const { editingAssignee } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.editingAssignee = editingAssignee;
  });
  return {
    ...nextState,
  };
};
