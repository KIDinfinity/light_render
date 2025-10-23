import { produce } from 'immer';

export default (state: any, action: any) => {
  return produce(state, (draftState: any) => {
    draftState = { ...draftState, ...action.payload };
  });
};
