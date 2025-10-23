import BooleanEnum from 'basic/enum/BooleanEnum';
import CustomerRole from 'basic/enum/CustomerRole';
import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const CLIENTINFO = {
  personalInfo: {
    customerRole: [CustomerRole.Director],
  },
  newClientFlag: BooleanEnum.Yes,
};

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();

    const clientInfoList = lodash.get(draftState, 'modalData.processData.clientInfoList', []) || [];

    draftState.modalData.processData.clientInfoList = lodash.compact([id].concat(clientInfoList));
    draftState.modalData.entities.clientMap[id] = { ...CLIENTINFO, id };
  });

  return { ...nextState };
};
