import { produce } from 'immer';
export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { changedFields, transactionId } = payload;
    draftState.entities.transactionTypesMap[
      transactionId
    ].paymentInMethodList[0].paymentBankList[0] = {
      ...draftState.entities.transactionTypesMap[transactionId]?.paymentInMethodList?.[0]
        ?.paymentBankList?.[0],

      ...changedFields,
    };
  });
