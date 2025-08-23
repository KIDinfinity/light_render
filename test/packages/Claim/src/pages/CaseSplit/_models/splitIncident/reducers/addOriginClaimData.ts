import { produce } from 'immer';
import lodash, { isString, uniq, forEach, concat } from 'lodash';

export default (state: any, { payload: { id } }: any) => {
  return produce(state, (draft: any) => {
    if (!isString(id)) {
      return draft;
    }
    const { originClaimEntities, originClaimProcessData, targetClaimEntities } = draft;

    const incidentIds: string[] = [];
    const treatmentMapIncident: object = {};

    // 添加 treatment
    forEach(targetClaimEntities.treatmentListMap, (value, key) => {
      if (value.incidentId === id && value.selected) {
        treatmentMapIncident[value.id] = value.incidentId;
        originClaimEntities.treatmentListMap[key] = value;
      }
    });

    // 添加 incident
    forEach(targetClaimEntities.incidentListMap, (value, key) => {
      if (value.id === id && value.selected) {
        const tempTarget = { ...value };
        tempTarget.treatmentList = lodash
          .filter(originClaimEntities.treatmentListMap, (item) => item.incidentId === value.id)
          .map((item) => item.id);
        tempTarget.claimTypeArray = targetClaimEntities.incidentListMap[key].claimTypeArray;
        incidentIds.push(tempTarget.id);
        originClaimEntities.incidentListMap[key] = tempTarget;
      }
    });

    originClaimProcessData.incidentList = uniq(
      concat(incidentIds, originClaimProcessData.incidentList)
    );
  });
};
