import { produce }  from 'immer';

const savePremBankAccount = (state: any, action: any) => {
  const { premBankAccount } = action.payload;
  return produce(state, (draftState: any) => {
    draftState.premBankAccount = premBankAccount;
  });
};

export default savePremBankAccount;
