import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) => {
  const { id, addressId } = payload;
  const nextState = produce(state, (draftState: any) => {
    const addressInfo = formUtils.cleanValidateData(
      draftState.modalData.entities.addressInfoMap[addressId]
    );
    const newAddressInfoId = uuidv4();

    draftState.modalData.entities.clientMap[
      id
    ].addressInfoList = draftState.modalData.entities.clientMap[id].addressInfoList.concat([
      newAddressInfoId,
    ]);
    draftState.modalData.entities.addressInfoMap[newAddressInfoId] = {
      ...addressInfo,
      addrType: null,
      id: newAddressInfoId,
    };
  });
  return { ...nextState };
};
