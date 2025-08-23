import { produce }  from 'immer';

const saveTransactionTypeList = (state: any, action: any) => {
  const { list } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.transactionTypeList = list;
  });
  return { ...nextState };
};

export default saveTransactionTypeList;
