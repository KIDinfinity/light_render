import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const CLIENTINFO = {
  addressInfoList: [],
  authorizedSignatory: {
    isManuallyAdded: 1,
  },
  backgroundInfo: {
    isManuallyAdded: 1,
  },
  contactInfoKH: {
    isManuallyAdded: 1,
  },
  contactInfoList: [],
  crtInfoList: [],
  financialInfo: {
    isManuallyAdded: 1,
  },
  nationalityInfo: {
    isManuallyAdded: 1,
  },
  otherInfo: {
    isManuallyAdded: 1,
  },
  personalInfo: {
    isManuallyAdded: 1,
  },
};

export default (state: any, { payload }: any) => {
  const id = uuidv4();

  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'modalData.processData.clientInfoList', []) || [];

    draftState.modalData.processData.clientInfoList = lodash.compact([id].concat(clientInfoList));
    draftState.modalData.entities.clientMap[id] = { ...CLIENTINFO, id };
    draftState.editingClientId = id;
  });

  return { ...nextState };
};
