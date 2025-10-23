import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  if (
    !lodash
      .chain(payload)
      .keys()
      .every((key) => lodash.includes(['clientMap', 'clientInfoList'], key))
      .value()
  ) {
    return state;
  }

  const nextState = produce(state, (draftState: any) => {
    draftState.entities.clientMap = payload.clientMap;
    draftState.processData.clientInfoList = payload.clientInfoList;
    draftState.modalData.entities.clientMap = payload.clientMap;
    draftState.modalData.processData.clientInfoList = payload.clientInfoList;
  });

  return { ...nextState };
};
