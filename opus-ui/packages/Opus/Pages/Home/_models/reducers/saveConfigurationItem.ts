import { produce } from 'immer';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.configurationItem = action.payload;
  });
  return { ...nextState };
};
