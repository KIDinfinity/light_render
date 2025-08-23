import { produce } from 'immer';
import { updatPayeeList } from '../functions/claimPayableFunc';

const updatePaymentAmountCallback = (state) => {
  const nextState = produce(state, (draftState) => {
    const { claimProcessData, claimEntities } = draftState;
    // 计算payeeList中每个人分配的收益金额
    updatPayeeList(claimProcessData, claimEntities);
  });
  return { ...nextState };
};

export default updatePaymentAmountCallback;
