import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import dropEmptyData from 'process/NB/ManualUnderwriting/utils/dropEmptyData';

export default (state: any, action: any) => {
  const { id, contactItem } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const newItemId = uuidv4();
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const currentClientInfo = lodash.find(clientInfoList, (item) => item?.id === id);
    const contactInfoList = lodash.get(currentClientInfo, 'contactInfoList', []) || [];
    if (
      dropEmptyData({ objItem: lodash.last(contactInfoList), loseFileds: ['id', 'contactSeqNum'] })
    ) {
      contactInfoList.pop();
    }
    contactInfoList.push(
      {
        ...contactItem,
        id: newItemId,
        contactSeqNum: contactInfoList?.length + 1,
        contactType: null,
      },
      { id: uuidv4(), contactSeqNum: contactInfoList?.length + 2 }
    );
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
