import { produce } from 'immer';
import lodash from 'lodash';

const savePolicyOwnerList = (state: any, action: any) => {
  const { policyOwnerList, clientInfoList } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!lodash.isArray(policyOwnerList)) {
      return;
    }

    draftState.policyOwnerList = lodash.map(policyOwnerList, (owner: any) => ({
      ownerClientInfo: lodash.find(clientInfoList, { clientId: owner?.clientId }) || {},
      ...owner,
    }));
  });

  return { ...nextState };
};

export default savePolicyOwnerList;
