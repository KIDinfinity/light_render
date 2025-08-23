import { produce }  from 'immer';
import lodash from 'lodash';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';

const removeChequeRemark = (state: any, action: any) => {
  const { chequeRemarkId } = action.payload;
  const payeeListMap = lodash.get(state, 'claimEntities.payeeListMap');
  const payeeId = getDefaultPayeeId(payeeListMap);

  const nextState = produce(state, (draftState) => {
    const newChequeRemarkList = lodash
      .chain(draftState.claimEntities.payeeListMap[payeeId].claimChequeRemarkList)
      .filter((item) => item.id !== chequeRemarkId)
      .map((remarkItem, idx)=> {
        remarkItem.seq = idx;
        return remarkItem
      })
      .value()

    draftState.claimEntities.payeeListMap[payeeId].claimChequeRemarkList = newChequeRemarkList;
  });

  return { ...nextState };
};

export default removeChequeRemark;
