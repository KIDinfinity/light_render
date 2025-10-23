import { produce } from 'immer';

export default (state: any, action: any) => {
  const { previewRecord } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.previewRecord = previewRecord;
  });
  return nextState;
};
