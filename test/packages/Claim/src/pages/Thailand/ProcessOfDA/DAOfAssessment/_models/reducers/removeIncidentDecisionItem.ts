import { produce } from 'immer';
import lodash from 'lodash';

const removeIncidentDecisionItem = (state: any, action: any) => {
  const { incidentDecisionId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.apIncidentDecisionList = lodash.without(
      draftState.claimProcessData.apIncidentDecisionList,
      incidentDecisionId
    );
    delete draftState.claimEntities.incidentDecisionListMap[incidentDecisionId];
  });

  return { ...nextState };
};

export default removeIncidentDecisionItem;
