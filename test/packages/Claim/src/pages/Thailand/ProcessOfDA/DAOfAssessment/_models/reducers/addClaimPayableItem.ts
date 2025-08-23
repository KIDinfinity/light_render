import { produce } from 'immer';
import { ClaimDecision } from '../dto';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import lodash from 'lodash';
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

    const claimPayableListMapValue = cleanFieldsMeta(
      draftState.claimEntities.claimPayableListMap
    );

    const existPending = lodash.some(
      claimPayableListMapValue,
      (payableItem) => payableItem.claimDecision === ClaimDecision.pending
    )

    draftState.claimProcessData.claimDecision = {
      ...draftState.claimProcessData.claimDecision,
      assessmentDecision: existPending? ClaimDecision.pending : ClaimDecision.approve,
    };
  });
  return { ...nextState };
};

export default addClaimPayableItem;
