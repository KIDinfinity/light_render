import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { id, addressId } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.entities.clientMap[
      id
    ].addressInfoList = draftState.modalData.entities.clientMap[id].addressInfoList.filter(
      (id: string) => id !== addressId
    );
    delete draftState.modalData.entities.addressInfoMap[addressId];
  });
  return { ...nextState };
};
