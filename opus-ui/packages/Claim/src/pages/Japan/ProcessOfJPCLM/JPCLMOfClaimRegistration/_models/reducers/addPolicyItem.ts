import { produce } from 'immer';

const addPolicyItem = (state: any, action: any) => {
  const { addPolicyItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.policyList = [
      ...draftState.claimProcessData.policyList,
      addPolicyItem.id,
    ];

    draftState.claimEntities.policyListMap[addPolicyItem.id] = addPolicyItem;
  });

  return { ...nextState };
};

export default addPolicyItem;
