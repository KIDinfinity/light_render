import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { hasAddOrRemoveClient } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.hasAddOrRemoveClient = hasAddOrRemoveClient;
  });
  return { ...nextState };
};
