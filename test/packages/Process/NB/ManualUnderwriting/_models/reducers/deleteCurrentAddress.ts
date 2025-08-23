import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, addressItemId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const dataItem = lodash.find(clientInfoList, (item) => item?.id === id);
    const addressList = lodash.get(dataItem, 'addressList', []);
    const addressItemDate = lodash.find(
      addressList,
      (addressItem: any) => addressItem?.id === addressItemId
    );
    const addressIndex = lodash.findIndex(
      addressList,
      (addressItem: any) => addressItem?.id === addressItemId
    );
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].addressList[${addressIndex}]`,
      { ...addressItemDate, deleted: 1 }
    );
  });
  return { ...nextState };
};
