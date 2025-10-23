import { produce } from 'immer';

export default (state: any, action: any) => {
  const { resources } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.resources = resources;
  });
  return { ...nextState };
};
