import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { id } = payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfo = draftState.modalData.entities.clientMap[id];
    const { addressInfoList } = clientInfo;
    delete draftState.modalData.entities.clientMap[id];
    draftState.modalData.processData.clientInfoList =
      draftState.modalData.processData.clientInfoList.filter((clientId: string) => clientId !== id);
    lodash.forEach(
      addressInfoList,
      (addressId: string) => delete draftState.modalData.entities.addressInfoMap[addressId]
    );
  });

  return {
    ...nextState,
  };
};
