import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, { payload }: any) => {
  const { id, changedValues } = payload;
  const nextState = produce(state, (draftState: any) => {
    const newAddressInfoId = uuidv4();
    draftState.modalData.entities.clientMap[id].addressInfoList = lodash.chain(draftState.modalData.entities.clientMap[id].addressInfoList).concat(
      [newAddressInfoId]
    ).compact().value();

    draftState.modalData.entities.addressInfoMap[newAddressInfoId] = {
      id: newAddressInfoId,
      isManuallyAdded: 1,
      ...changedValues,
    };
  });
  return { ...nextState };
};
