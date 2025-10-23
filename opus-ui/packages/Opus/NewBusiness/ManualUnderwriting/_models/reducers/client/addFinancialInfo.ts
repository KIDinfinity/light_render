import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, { payload }: any) => {
  const { id } = payload;
  const nextState = produce(state, (draftState: any) => {
    const newCrtInfoId = uuidv4();
    draftState.modalData.entities.clientMap[id].crtInfoList = lodash
      .chain(draftState.modalData.entities.clientMap[id].crtInfoList)
      .concat([newCrtInfoId])
      .compact()
      .value();
    draftState.modalData.entities.crtInfoMap[newCrtInfoId] = {
      id: newCrtInfoId,
      ctfType: 'TN',
      type: 'S',
      isManuallyAdded: 1,
    };
    draftState.modalData.addFinancial = {};
  });
  return { ...nextState };
};
