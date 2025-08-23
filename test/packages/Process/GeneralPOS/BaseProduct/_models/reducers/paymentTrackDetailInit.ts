/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    if (lodash.isEmpty(draftState.entities.transactionTypesMap[transactionId]?.paymentTrack)) {
      lodash.set(draftState, `entities.transactionTypesMap[${transactionId}].paymentTrack`, {});
    }
  });
