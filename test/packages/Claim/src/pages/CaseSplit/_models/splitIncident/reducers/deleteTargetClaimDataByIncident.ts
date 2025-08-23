import { produce } from 'immer';
import lodash, { isString } from 'lodash';

export default (state: any, { payload: { id } }: any) => {
  return produce(state, (draft: any) => {
    if (!isString(id)) {
      return draft;
    }

    const { targetClaimEntities, targetClaimProcessData } = draft;

    draft.splitByIncidentIds = lodash.filter(draft.splitByIncidentIds, item => item !== id);
    targetClaimProcessData.incidentList = lodash.filter(targetClaimProcessData.incidentList, item => item !== id);
    const treatmentList = targetClaimEntities.incidentListMap?.[id]?.treatmentList;
    lodash.forEach(treatmentList, treatmentId => delete targetClaimEntities.treatmentListMap[treatmentId]);
    delete targetClaimEntities.incidentListMap?.[id];
  });
};
