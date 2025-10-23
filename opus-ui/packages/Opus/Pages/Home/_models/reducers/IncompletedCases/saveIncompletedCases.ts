import { produce } from 'immer';

export default (state: any, action: any) => {
  const { incompleteCases } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.incompleteCases = { ...draftState.incompleteCases, ...incompleteCases };
  });
  return { ...nextState };
};
