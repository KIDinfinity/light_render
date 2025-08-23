import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { index } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.currentEwsDataIndex = index;
  });
  return { ...nextState };
};
