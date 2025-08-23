import { produce } from 'immer';
import { SwitchEnum } from 'claim/pages/utils/claim';

const addClaimPayableItem = (state: any, action: any) => {
  const { addClaimPayableItem } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    addClaimPayableItem.manualAdd = SwitchEnum.YES;
    draftState.claimProcessData.claimPayableList = [
      ...draftState.claimProcessData.claimPayableList,
      addClaimPayableItem.id,
    ];
    draftState.claimEntities.claimPayableListMap[addClaimPayableItem.id] = addClaimPayableItem;
  });

  return { ...nextState };
};

export default addClaimPayableItem;
