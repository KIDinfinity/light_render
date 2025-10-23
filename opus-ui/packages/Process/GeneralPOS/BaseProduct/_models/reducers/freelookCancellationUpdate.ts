/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId } = payload;
    draftState.entities.transactionTypesMap[transactionId].freelookCancellation = {
      ...draftState.entities.transactionTypesMap[transactionId].freelookCancellation,
      ...changedFields,
    };
  });
