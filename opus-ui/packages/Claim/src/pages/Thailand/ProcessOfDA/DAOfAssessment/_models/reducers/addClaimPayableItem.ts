import { produce } from 'immer';
import { ClaimDecision } from '../dto';
import Ienum from 'claim/enum';

const addClaimPayableItem = (state: any, action: any) => {
  const { addClaimPayableItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.claimPayableList = [
      ...draftState.claimProcessData.claimPayableList,
      addClaimPayableItem.id,
    ];

    draftState.claimEntities.claimPayableListMap[addClaimPayableItem.id] = {
      ...addClaimPayableItem,
      operation: Ienum.Operation.A,
    };

    draftState.claimProcessData.claimDecision = {
      ...draftState.claimProcessData.claimDecision,
      assessmentDecision: ClaimDecision.approve,
    };
  });
  return { ...nextState };
};

export default addClaimPayableItem;
