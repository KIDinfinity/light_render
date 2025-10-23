import { produce } from 'immer';
import { filter } from 'lodash';
import { removeClaimPayableItemExpectDecision } from '../functions/expectDecisionFunc';
import { removeTreatmentPayableList } from '../functions/claimPayableFunc';
import { deleteErrorMessages } from '../functions';

const deleteIncidentPayableItem = (state, action) => {
  const { incidentPayableId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const { claimEntities, claimProcessData } = draftState;

    removeClaimPayableItemExpectDecision(claimProcessData, claimEntities, incidentPayableId);
    claimProcessData.claimPayableList = filter(
      claimProcessData.claimPayableList,
      (payableId) => payableId !== incidentPayableId
    );

    removeTreatmentPayableList(claimEntities, claimEntities.claimPayableListMap[incidentPayableId]);

    delete claimEntities.claimPayableListMap[incidentPayableId];
    deleteErrorMessages.delClaimPayableProduct(
      draftState.claimEntities.claimPayableListMap,
      incidentPayableId
    );
    deleteErrorMessages.delClaimPayableBenefitType(
      draftState.claimEntities.claimPayableListMap,
      incidentPayableId
    );
    deleteErrorMessages.delLifePayableBenefitItem(
      draftState.claimEntities.claimPayableListMap,
      incidentPayableId
    );
  });
  return { ...nextState };
};

export default deleteIncidentPayableItem;
