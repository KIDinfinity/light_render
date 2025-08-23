import { produce } from 'immer';

export default (state: any, action: any) => {
  const { popUpstatus } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.popUpstatus = popUpstatus;
  });
  return { ...nextState };
};
