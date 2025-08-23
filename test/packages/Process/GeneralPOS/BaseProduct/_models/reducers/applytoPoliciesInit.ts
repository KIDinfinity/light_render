import { produce }  from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;

    if (!draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList) {
      draftState.entities.transactionTypesMap[transactionId].applyToPolicyBOList = [];
    }
  });
