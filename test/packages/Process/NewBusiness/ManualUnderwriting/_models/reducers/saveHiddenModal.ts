import { produce } from 'immer';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData = {};
    draftState.modalShouldClose = draftState.modalShouldClose === 1? true : 1;
    delete draftState.modalData.entities;
  });
  return {
    ...nextState,
  };
};
