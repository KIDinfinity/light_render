import BooleanEnum from 'basic/enum/BooleanEnum';
import CustomerRole from 'basic/enum/CustomerRole';
import { produce } from 'immer';
import lodash from 'lodash';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import { v4 as uuidv4 } from 'uuid';

const CLIENTINFO = {
  personalInfo: {
    customerRole: [CustomerRole.UBO],
    customerType: CustomerType.Individual,
  },
  backgroundInfo: {},
  isManuallyAdded: true,
  nationalityInfo: {},
  newClientFlag: BooleanEnum.Yes,
};

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const id = uuidv4();
    const addressId = uuidv4();
    const addressInfo = { id: addressId };

    const clientInfoList = lodash.get(draftState, 'modalData.processData.clientInfoList', []) || [];

    draftState.modalData.processData.clientInfoList = lodash.compact([id].concat(clientInfoList));
    draftState.modalData.entities.clientMap[id] = {
      ...CLIENTINFO,
      id,
      addressInfoList: [addressId],
    };
    draftState.modalData.entities.addressInfoMap[addressId] = addressInfo;
  });
  return { ...nextState };
};
