import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, { payload }: any) => {
  const { id, changedValues } = payload;
  const nextState = produce(state, (draftState: any) => {
    const newContactInfoId = uuidv4();

    draftState.modalData.entities.clientMap[id].contactInfoList = lodash
      .chain(draftState.modalData.entities.clientMap[id].contactInfoList)
      .concat([newContactInfoId])
      .compact()
      .value();
    draftState.modalData.entities.contactInfoMap[newContactInfoId] = {
      id: newContactInfoId,
      isManuallyAdded: 1,
      ...changedValues,
    };
  });
  return { ...nextState };
};
