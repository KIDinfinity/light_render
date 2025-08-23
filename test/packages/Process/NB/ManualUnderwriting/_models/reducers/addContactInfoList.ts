import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, itemId, contactType, contactNo, contactSeqNum } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    lodash.set(draftState, `businessData.policyList[0].clientInfoList[${index}].contactInfoList`, [
      {
        id: itemId,
        contactType,
        contactNo,
        contactSeqNum,
      },
    ]);
  });
  return { ...nextState };
};
