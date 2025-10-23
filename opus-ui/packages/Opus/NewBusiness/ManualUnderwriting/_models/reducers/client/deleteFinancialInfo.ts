import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { id, crtId } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.entities.clientMap[id].crtInfoList =
      draftState.modalData.entities.clientMap[id].crtInfoList.filter(
        (temId: string) => temId !== crtId
      );
    delete draftState.modalData.entities.crtInfoMap[crtId];

    const validItem = lodash.some(
      draftState.modalData.entities.clientMap[id].crtInfoList,
      (crtItemId) => {
        const item = draftState.modalData.entities.crtInfoMap[crtItemId];
        if (item?.type === 'S' && item?.ctfType === 'TN' && item?.ctfCountryCode !== 'USA') {
          return true;
        }
        return false;
      }
    );
    if (!validItem) {
      draftState.modalData.entities.clientMap[id].newCrs = 'N';
    }
  });
  return { ...nextState };
};
