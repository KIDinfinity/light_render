/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, recoverItem = {} } = payload;

    draftState.entities.transactionTypesMap[transactionId].policyAddr = {
      ...draftState.entities.transactionTypesMap[transactionId].policyAddr,
      ...recoverItem,
    };
  });
