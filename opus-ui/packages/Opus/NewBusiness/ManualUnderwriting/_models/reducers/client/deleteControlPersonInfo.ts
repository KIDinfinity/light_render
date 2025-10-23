import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { id } = payload;
  const nextState = produce(state, (draftState: any) => {
    delete draftState.modalData.entities.clientMap[id];
    draftState.modalData.processData.clientInfoList =
      draftState.modalData.processData.clientInfoList.filter((clientId: string) => clientId !== id);
  });

  return {
    ...nextState,
  };
};
