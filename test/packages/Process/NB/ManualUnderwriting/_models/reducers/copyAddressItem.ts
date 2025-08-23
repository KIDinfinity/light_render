import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import dropEmptyData from 'process/NB/ManualUnderwriting/utils/dropEmptyData';

export default (state: any, action: any) => {
  const { id, addressItem, notExistingAddressType } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const newItemId = uuidv4();
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const currentClientInfo = lodash.find(clientInfoList, (item) => item?.id === id);
    const addressList = lodash.get(currentClientInfo, 'addressList', []) || [];
    if (
      dropEmptyData({
        objItem: lodash.last(addressList),
        loseFileds: ['id', 'communicationLane', 'addrType'],
      })
    ) {
      addressList.pop();
    }
    const targetPushArr = (() => {
      if (!lodash.isEmpty(notExistingAddressType)) {
        return [
          {
            ...addressItem,
            id: newItemId,
            addrType: null,
          },
          { id: uuidv4() },
        ];
      } else {
        return [
          {
            ...addressItem,
            id: newItemId,
            addrType: null,
          },
        ];
      }
    })();
    addressList.push(...targetPushArr);
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].addressList`,
      addressList
    );
  });
  return {
    ...nextState,
  };
};
