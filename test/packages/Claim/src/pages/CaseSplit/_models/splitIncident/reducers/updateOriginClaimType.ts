import { produce } from 'immer';
import { isString, without } from 'lodash';

export default (state: any, { payload: { incidentId, claimType, isActived } }: any) => {
  return produce(state, (draft: any) => {
    const { claimTypeTemp } = draft.originClaimEntities.incidentListMap[incidentId];
    let tempClaimType: string[] = [...claimTypeTemp];
    if (isString(claimType)) {
      if (isActived) {
        tempClaimType = without(claimTypeTemp, claimType);
      } else {
        tempClaimType.push(claimType);
      }
    }
    draft.originClaimEntities.incidentListMap[incidentId].claimTypeTemp = tempClaimType;
  });
};
