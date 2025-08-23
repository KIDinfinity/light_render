import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import ContactType from 'process/NB/ManualUnderwriting/Enum/ContactType';

export default (state: any, action: any) => {
  const { id } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const dataItem = lodash.find(clientInfoList, (item) => item?.id === id);
    const contactInfoList = lodash.get(dataItem, 'contactInfoList', []) || [];
    const currentMBContactSize = lodash
      .chain(contactInfoList)
      .filter((contact) => contact.contactType === ContactType.Mobile)
      .size()
      .value();
    if (currentMBContactSize < 2) {
      if (currentMBContactSize === 0) {
        contactInfoList.unshift({
          id: uuidv4(),
          contactType: ContactType.Mobile,
          contactSeqNum: 1,
        });
      }
      contactInfoList.unshift({
        id: uuidv4(),
        contactType: ContactType.Mobile,
        contactSeqNum: 2,
      });
    }
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
