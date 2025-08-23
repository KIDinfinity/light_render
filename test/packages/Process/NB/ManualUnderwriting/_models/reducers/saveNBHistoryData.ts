import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { nbHistoryData } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.nbHistoryData = nbHistoryData;
  });
  return { ...nextState };
};
