import { produce } from 'immer';

import { SwitchEnum } from 'process/Utils/Payable';

const addPayeeBankAccount = (state: any, { payload = {} }: any) => {
  const { payeeId, id } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.payeeListMap[payeeId].payeeBankAccountList = [
      ...(draftState.claimEntities.payeeListMap[payeeId].payeeBankAccountList || []),
      {
        id,
        manualAdd: SwitchEnum.YES,
        isNewBankAccount: SwitchEnum.YES,
        isDefault: true,
        isSelect: true,
      },
    ];
  });

  return { ...nextState };
};

export default addPayeeBankAccount;
