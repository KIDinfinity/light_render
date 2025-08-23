import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { id, crtId } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.entities.clientMap[
      id
    ].crtInfoList = draftState.modalData.entities.clientMap[id].crtInfoList.filter(
      (temId: string) => temId !== crtId
    );
    delete draftState.modalData.entities.crtInfoMap[crtId];
  });
  return { ...nextState };
};
