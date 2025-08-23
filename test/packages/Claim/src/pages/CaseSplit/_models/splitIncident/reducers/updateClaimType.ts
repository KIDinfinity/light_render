import { produce } from 'immer';

export default (state: any, { payload: { incidentId, changedFields, isOrigin } }: any) => {
  return produce(state, (draft: any) => {
    if (isOrigin) {
      draft.originClaimEntities.incidentListMap[incidentId].claimTypeArray = changedFields.claimTypeArray
    } else {
      draft.targetClaimEntities.incidentListMap[incidentId].claimTypeArray = changedFields.claimTypeArray
    }
  });
};
