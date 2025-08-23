import { produce }  from 'immer';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';

export default (state: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const payeeListMap = lodash.get(state, 'claimEntities.payeeListMap');
    const payeeId = getDefaultPayeeId(payeeListMap);
    const addRemarkItem = {
      claimNo: draftState.claimProcessData.claimNo,
      id: uuidv4(),
      remark: '',
    };
    draft.claimEntities.payeeListMap[payeeId].claimChequeRemarkList = [
      ...(draftState.claimEntities.payeeListMap[payeeId].claimChequeRemarkList || []),
      addRemarkItem,
    ];
  });
};
