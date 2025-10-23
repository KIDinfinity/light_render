import { produce } from 'immer';
import lodash from 'lodash';

const removePayeeBankAccount = (state: any, { payload = {} }: any) => {
  const { payeeId, id } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.payeeListMap[payeeId].payeeBankAccountList = lodash.filter(
      draftState.claimEntities.payeeListMap[payeeId].payeeBankAccountList,
      (item: any) => id !== item.id
    );
  });

  return { ...nextState };
};

export default removePayeeBankAccount;
