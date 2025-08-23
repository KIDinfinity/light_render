import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: Object) => {
  const { policyId, clientId, changedFields } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    const policyList = lodash.get(draftState, 'claimProcessData.policyList', []);

    const policyIndex = lodash.findIndex(policyList, (item) => item.id === policyId);
    const policyItem = lodash.find(policyList, (item) => item.id === policyId);
    const clientInfoList = lodash.get(policyItem, 'clientInfoList', []);
    const clientIndex = lodash.findIndex(clientInfoList, (item: any) => item?.id === clientId);
    lodash.set(
      draftState,
      `claimProcessData.policyList[${policyIndex}].clientInfoList[${clientIndex}].updateClientOption`,
      changedFields.updateClientOption
    );
  });
  return { ...nextState };
};
