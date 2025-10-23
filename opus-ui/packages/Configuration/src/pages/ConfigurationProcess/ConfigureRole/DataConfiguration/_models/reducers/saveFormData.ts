import { produce } from 'immer';

export default (state: any, action: any) => {
  const { formData } = action.payload;
    const nextState = produce(state, (draftState: any) => {
      draftState.formData = formData;
      draftState.allRoleLists = { ...draftState.allRoleLists, ...action.payload.allRoleLists };
    });
    return nextState;
};
