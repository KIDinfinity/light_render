import { produce }  from 'immer';

export default (state: any, action: any) => {
  const loadingStatus = action.payload?.loadingStatus
  const nextState = produce(state, (draftState: any) => {
    draftState.loadingStatus = loadingStatus;
  });
  return { ...nextState };
};

