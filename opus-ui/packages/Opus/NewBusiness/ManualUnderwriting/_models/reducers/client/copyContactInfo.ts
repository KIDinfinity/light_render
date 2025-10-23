import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) => {
  const { id, contactId } = payload;
  const nextState = produce(state, (draftState: any) => {
    const contactInfo = formUtils.cleanValidateData(
      draftState.modalData.entities.contactInfoMap[contactId]
    );
    const newContactInfoId = uuidv4();

    draftState.modalData.entities.clientMap[
      id
    ].contactInfoList = draftState.modalData.entities.clientMap[id].contactInfoList.concat([
      newContactInfoId,
    ]);
    draftState.modalData.entities.contactInfoMap[newContactInfoId] = {
      ...contactInfo,
      contactType: null,
      id: newContactInfoId,
    };
  });
  return { ...nextState };
};
