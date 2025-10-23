import { produce } from 'immer';

const addClaimPayableItem = (state: any, action: any) => {
  const { addClaimPayableItem } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.claimProcessData.claimPayableList = [
      ...draftState.claimProcessData.claimPayableList,
      addClaimPayableItem.id,
    ];
    draftState.claimEntities.claimPayableListMap[addClaimPayableItem.id] = addClaimPayableItem;
  });

  return { ...nextState };
};

export default addClaimPayableItem;
