import { produce } from 'immer';
import lodash from 'lodash';

const choosePayment = (state: any, { payload = {} }: any) => {
  const { id, payeeId } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.payeeListMap[payeeId].payeeBankAccountList = lodash.map(
      draftState.claimEntities.payeeListMap[payeeId].payeeBankAccountList,
      (el: any) => {
        return {
          ...el,
          isDefault: el.id === id,
          isSelect: el.id === id,
        };
      }
    );
  });

  return { ...nextState };
};

export default choosePayment;
