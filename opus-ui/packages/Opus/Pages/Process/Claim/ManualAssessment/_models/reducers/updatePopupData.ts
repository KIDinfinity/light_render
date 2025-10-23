import { produce } from 'immer';

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    if (action?.payload) {
      draftState.popupData = {
        ...draftState.popupData,
        ...action.payload,
      };
    }
  });

  return nextState;
};
