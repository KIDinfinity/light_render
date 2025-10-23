import { produce } from 'immer';

const savePolicyOwnerList = (state: any, action: any) => {
  const { policyOwnerList } = action.payload;
  const nextState = produce(state, (draftState) => {
    draftState.policyOwnerList = policyOwnerList;
  });
  return { ...nextState };
};

export default savePolicyOwnerList;
