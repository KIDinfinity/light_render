import { produce } from 'immer';
import lodash from 'lodash';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';

const removeChequeRemark = (state: any, action: any) => {
  const { chequeRemarkId } = action.payload;
  const payeeListMap = lodash.get(state, 'claimEntities.payeeListMap');
  const payeeId = getDefaultPayeeId(payeeListMap);

  const newChequeRemarkList = lodash.filter(
    state.claimEntities.payeeListMap[payeeId].claimChequeRemarkList,
    (item) => item.id !== chequeRemarkId
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.payeeListMap[payeeId].claimChequeRemarkList = newChequeRemarkList;
  });

  return { ...nextState };
};

export default removeChequeRemark;
