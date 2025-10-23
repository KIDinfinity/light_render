import { produce } from 'immer';

export default (state: any, action: any) => {
  const { categoryCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.categoryCode = categoryCode;
  });
  return { ...nextState };
};
