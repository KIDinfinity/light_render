import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, id, addressInfoId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    lodash.set(draftState, 'stepsChange.ClientInfo', true);
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const dataItem = lodash.find(clientInfoList, (item) => item?.id === id);
    const addressInfoList = lodash.get(dataItem, 'addressList', []) || [];

    const addressListIndex = lodash.findIndex(
      addressInfoList,
      (item: any) => item.id === addressInfoId
    );
    const addressList = lodash.find(addressInfoList, (item) => item.id === addressInfoId);
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].addressList[${addressListIndex}]`,
      {
        ...addressList,
        ...changedFields,
      }
    );
  });
  return {
    ...nextState,
  };
};
