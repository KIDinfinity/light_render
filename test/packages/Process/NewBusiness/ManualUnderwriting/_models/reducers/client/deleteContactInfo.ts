import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { id, contactId } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.entities.clientMap[id].contactInfoList =
      draftState.modalData.entities.clientMap[id].contactInfoList.filter(
        (id: string) => id !== contactId
      );
    delete draftState.modalData.entities.contactInfoMap[contactId];
  });
  return { ...nextState };
};
