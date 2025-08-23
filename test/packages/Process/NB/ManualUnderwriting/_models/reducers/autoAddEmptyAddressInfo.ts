import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { id } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const currentClientInfo = lodash.find(clientInfoList, (item) => item?.id === id);
    const addressList = lodash.get(currentClientInfo, 'addressList', []) || [];

    lodash.set(draftState, `businessData.policyList[0].clientInfoList[${index}].addressList`, [
      ...addressList,
      { id: uuidv4() },
    ]);
  });
  return {
    ...nextState,
  };
};
