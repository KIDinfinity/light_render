/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, changedFields, validating } = payload;
    draftState.entities.transactionTypesMap[transactionId].paymentTrack = {
      ...draftState.entities.transactionTypesMap[transactionId].paymentTrack,
      ...changedFields,
    };
  });
