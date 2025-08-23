import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id,addressInfoId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const clientInfoList = lodash.get(draftState, 'businessData.policyList[0].clientInfoList');
    const index = lodash.findIndex(clientInfoList, (item: any) => item?.id === id);
    const currentClientInfo = lodash.find(clientInfoList, (item) => item?.id === id);
    const addressList = lodash.get(currentClientInfo, 'addressList', []) || [];
    lodash.set(
      draftState,
      `businessData.policyList[0].clientInfoList[${index}].addressList`,
      lodash.filter(addressList, (item: any) => item?.id !== addressInfoId)
    );
  });
  return {
    ...nextState,
  };
};
