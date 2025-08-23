import { produce } from 'immer';

export default (state: any, action: any) => {
  const { type } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.checkModalType = type;
  });
  return nextState;
};
