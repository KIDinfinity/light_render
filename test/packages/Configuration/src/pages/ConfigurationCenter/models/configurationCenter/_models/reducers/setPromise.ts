import { produce }  from 'immer';

export default (state: any, action: any) => {
  const { payload } = action;
  const nextState = produce(state, (draftState: any) => {
    return {
      ...draftState,
      showDataPatchModal: true,
      dataPatchPromise: payload.resolve,
    };
  });
  return nextState;
};
