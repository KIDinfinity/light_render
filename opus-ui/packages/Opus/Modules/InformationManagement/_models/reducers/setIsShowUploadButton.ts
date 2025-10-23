import { produce } from 'immer';

export default (state: any, action: Object) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.isShowUploadButton = action.payload;
  });
  return {
    ...nextState,
  };
};
