import { produce } from 'immer';

export default (state: any, { payload }) => {
  return produce(state, (draftState: any) => {
    draftState.showEscalateModal = true;
    if (!!payload?.cancel) {
      draftState.showEscalateModal = false;
    }
  });
};
