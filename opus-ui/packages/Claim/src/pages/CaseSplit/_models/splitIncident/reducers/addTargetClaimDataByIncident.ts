import { produce } from 'immer';
import { isString, uniq, forEach, concat } from 'lodash';
import { getMapValueIds } from '../../functions';

export default (state: any, { payload: { id } }: any) => {
  return produce(state, (draft: any) => {
    if (!isString(id)) {
      return draft;
    }

    const { originClaimEntities, targetClaimEntities, targetClaimProcessData } = draft;

    const incidentIds: string[] = [];
    const treatmentMapIncident: object = {};

    // 添加 treatment
    forEach(originClaimEntities.treatmentListMap, (value, key) => {
      if (value.incidentId === id) {
        treatmentMapIncident[value.id] = value.incidentId;
        targetClaimEntities.treatmentListMap[key] = value;
      }
    });

    // 添加 incident
    forEach(originClaimEntities.incidentListMap, (value, key) => {
      if (value.id === id) {
        const tempTarget = { ...value };
        tempTarget.treatmentList = getMapValueIds(treatmentMapIncident, tempTarget.id);
        incidentIds.push(tempTarget.id);
        targetClaimEntities.incidentListMap[key] = tempTarget;
      }
    });
    draft.splitByIncidentIds = uniq([...draft.splitByIncidentIds, id]);
    targetClaimProcessData.incidentList = uniq(
      concat(incidentIds, targetClaimProcessData.incidentList)
    );
  });
};
