import { produce } from 'immer';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData = {};
    delete draftState.modalData.entities;
  });
  return {
    ...nextState,
  };
};
