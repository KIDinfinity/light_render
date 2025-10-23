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

const getDefaultValues = (changedValues: any) => {
  if (!changedValues) {
    return CLIENTINFO;
  }

  return lodash.entries(CLIENTINFO).reduce((acc: any, [key, value]) => {
    if (lodash.isObject(value) && lodash.isObject(changedValues[key])) {
      acc[key] = { ...value, ...changedValues[key] };
    } else if (lodash.isArray(value) && lodash.isArray(changedValues[key])) {
      acc[key] = [...value, ...changedValues[key]];
    } else {
      acc[key] = changedValues[key] ?? value;
    }
    return acc;
  }, {});
  O;
};

export const addNewClient = ({ draftState, changedValues }: any) => {
  const id = uuidv4();
  const clientInfoList = lodash.get(draftState, 'modalData.processData.clientInfoList', []) || [];

  draftState.modalData.processData.clientInfoList = lodash.compact([id].concat(clientInfoList));
  const defaultValues = getDefaultValues(changedValues);
  draftState.modalData.entities.clientMap[id] = { ...defaultValues, id };
  draftState.editingClientId = id;
};

export default (state: any, { payload }: any) => {
  const { changedValues } = payload || {};

  const nextState = produce(state, (draftState: any) => {
    addNewClient({ draftState, changedValues });
  });

  return { ...nextState };
};
