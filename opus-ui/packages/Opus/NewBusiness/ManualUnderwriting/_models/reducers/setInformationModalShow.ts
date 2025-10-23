import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const {
      cancel = false,
      category = '',
      resolve = '',
      reject = '',
      taskDetail = {},
    } = payload || {};

    if (!!cancel) {
      draftState.showInformationModal = false;
      draftState.informationModalCategory = undefined;
      draftState.informationModalResolve = undefined;
      draftState.informationModalReject = undefined;
      draftState.informationModalTaskDetail = {};
    } else {
      draftState.showInformationModal = true;
      draftState.informationModalCategory = category;
      draftState.informationModalResolve = resolve;
      draftState.informationModalReject = reject;
      draftState.informationModalTaskDetail = taskDetail;
    }
  });

  return { ...nextState };
};
