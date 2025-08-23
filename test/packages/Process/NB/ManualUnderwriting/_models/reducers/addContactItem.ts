import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { id } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const newItemId = uuidv4();
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const dataItem = lodash.find(clientInfoList, (item) => item?.id === id);
    const contactInfoList = lodash.get(dataItem, 'contactInfoList', []) || [];
    contactInfoList.push({
      id: newItemId,
      contactSeqNum: contactInfoList?.length + 1,
    });
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].contactInfoList`,
      contactInfoList
    );
  });
  return {
    ...nextState,
  };
};
