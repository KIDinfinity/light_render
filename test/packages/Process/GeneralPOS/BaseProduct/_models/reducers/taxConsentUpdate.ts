/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, changedFields } = payload;

    draftState.entities.transactionTypesMap[transactionId].taxConsent = {
      ...draftState.entities.transactionTypesMap[transactionId].taxConsent,
      ...changedFields,
    };
  });
