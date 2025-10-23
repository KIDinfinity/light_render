/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    if (!draftState.commonAddModal) {
      draftState.commonAddModal = {};
    }

    draftState.commonAddModal = payload;
  });
