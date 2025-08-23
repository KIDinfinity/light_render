import { produce } from 'immer';

export default (state: any, action: any) => {
  const { previewRecord, id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.previewMap[id] = previewRecord;
  });
  return nextState;
};
