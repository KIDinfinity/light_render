import { produce } from 'immer';

export default (state: any, action: any) => {
  const { list } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.checkSelectedRow = list;
  });
  return nextState;
};
