import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { clientId } = payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'modalData.processData.clientInfoList', []) || [];
    const addressInfoList =
      lodash.get(draftState, `modalData.entities.clientMap.${clientId}.addressInfoList`, []) || [];
    const contactInfoList =
      lodash.get(draftState, `modalData.entities.clientMap.${clientId}.contactInfoList`, []) || [];
    const crtInfoList =
      lodash.get(draftState, `modalData.entities.clientMap.${clientId}.crtInfoList`, []) || [];

    draftState.modalData.processData.clientInfoList = clientInfoList.filter(
      (id: string) => id !== clientId
    );
    lodash.forEach(addressInfoList, (id) => {
      delete draftState.modalData.entities.addressInfoMap[id];
    });
    lodash.forEach(contactInfoList, (id) => {
      delete draftState.modalData.entities.contactInfoMap[id];
    });
    lodash.forEach(crtInfoList, (id) => {
      delete draftState.modalData.entities.crtInfoMap[id];
    });

    delete draftState.modalData.entities.clientMap[clientId];
    draftState.editingClientId = draftState.modalData?.processData?.clientInfoList?.[0];
  });
  return { ...nextState };
};
