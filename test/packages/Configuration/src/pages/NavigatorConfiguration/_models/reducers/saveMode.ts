import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { mode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.mode = mode;
  });
  return { ...nextState };
};
