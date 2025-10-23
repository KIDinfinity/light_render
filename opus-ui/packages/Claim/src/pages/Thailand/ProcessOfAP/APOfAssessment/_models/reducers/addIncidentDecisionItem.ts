import { produce } from 'immer';
import lodash from 'lodash';

const addIncidentDecisionItem = (state: any, action: any) => {
  const { incidentDecisionItem } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.apIncidentDecisionList = [
      ...lodash.compact(draftState.claimProcessData.apIncidentDecisionList),
      incidentDecisionItem.id,
    ];
    draftState.claimEntities.incidentDecisionListMap[
      incidentDecisionItem.id
    ] = incidentDecisionItem;
  });

  return { ...nextState };
};

export default addIncidentDecisionItem;
