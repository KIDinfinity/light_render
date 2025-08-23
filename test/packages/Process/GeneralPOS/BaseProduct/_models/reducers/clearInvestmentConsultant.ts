/* eslint-disable no-param-reassign */
import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    draftState.entities.transactionTypesMap[transactionId].investmentConsultant = {};
  });
