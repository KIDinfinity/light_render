import { produce } from 'immer';

export default (state: any, action: any) => {
  const { currentController } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.currentController = currentController;
  });

  return { ...nextState };
};
