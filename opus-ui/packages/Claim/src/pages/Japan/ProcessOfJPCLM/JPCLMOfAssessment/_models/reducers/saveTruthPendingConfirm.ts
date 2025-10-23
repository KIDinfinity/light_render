import { produce } from 'immer';

const saveTruthPendingConfirm = (state: any, { payload }: any) => {
  const { pendingConfirm } = payload;
  return produce(state, (draftState: any) => {
    draftState.pendingConfirm = pendingConfirm;
  });
};

export default saveTruthPendingConfirm;
