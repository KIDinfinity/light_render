import { produce } from 'immer';
import { forEach } from 'lodash';
import { ClaimDecision } from 'claim/pages/utils/claim';

const hideDecisionModal = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { claimProcessData, claimEntities } = draftState;
    const { apIncidentDecisionList } = claimProcessData;
    const { incidentDecisionListMap } = claimEntities;
    draftState.decisionModalShowStatus = false;
    forEach(apIncidentDecisionList, (incidentDecisionId) => {
      const incidentDecision = incidentDecisionListMap[incidentDecisionId];
      incidentDecision.decision = ClaimDecision.deny;
      claimEntities.incidentDecisionListMap[incidentDecisionId] = incidentDecision;
    });
  });
  return { ...nextState };
};

export default hideDecisionModal;
