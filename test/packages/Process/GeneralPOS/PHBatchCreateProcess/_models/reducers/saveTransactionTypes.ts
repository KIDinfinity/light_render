/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionTypes } = payload;
    draftState.processData.transactionTypes = transactionTypes;
  });
