import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { show, resolve, reject, taskDetail = {} } = payload || {};
    let updatedData: any = {};

    if (show !== undefined) {
      if (show) {
        updatedData.show = true;
        updatedData.resolve = resolve;
        updatedData.reject = reject;
        updatedData.taskDetail = taskDetail;
        updatedData.errorMsgs = [];
      } else {
        updatedData.show = false;
        updatedData.resolve = undefined;
        updatedData.reject = undefined;
        updatedData.taskDetail = {};
        updatedData.errorMsgs = [];
      }
    } else {
      updatedData = { ...lodash.cloneDeep(draftState.premiumTransferModalData), ...payload };
    }

    draftState.premiumTransferModalData = updatedData;
  });

  return { ...nextState };
};
