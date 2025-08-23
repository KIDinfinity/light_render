/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields } = payload;

    draftState.processData.clientInfo = {
      ...draftState.processData.clientInfo,
      ...changedFields,
    };
  });
