import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { cancel = false, resolve = '', reject = '', errorMessage = '' } = payload || {};

    if (!!cancel) {
      draftState.showConfirmModal = false;
      draftState.confirmModalResolve = undefined;
      draftState.confirmModalReject = undefined;
      draftState.errorMessage = '';
    } else {
      draftState.showConfirmModal = true;
      draftState.confirmModalResolve = resolve;
      draftState.confirmModalReject = reject;
      draftState.errorMessage = errorMessage;
    }
  });

  return { ...nextState };
};
