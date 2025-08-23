import { produce } from 'immer';
import { isString, forEach, without } from 'lodash';
import { getMapValueIds } from '../../functions';

export default (state: any, { payload: { id } }: any) => {
  return produce(state, (draft: any) => {
    if (!isString(id)) {
      return draft;
    }

    const { targetClaimEntities, targetClaimProcessData } = draft;

    const incidentIds: string[] = [];
    const treatmentMapIncident: object = {};

    // 删除 treatment
    forEach(targetClaimEntities.treatmentListMap, (value, key) => {
      if (value.incidentId === id && value.selected) {
        treatmentMapIncident[value.id] = value.incidentId;
        delete targetClaimEntities.treatmentListMap[key];
      }
    });

    // 删除 incident
    forEach(targetClaimEntities.incidentListMap, (value, key) => {
      if (value.id === id && value.selected) {
        value.treatmentList = without(
          value.treatmentList,
          ...getMapValueIds(treatmentMapIncident, value.id)
        );

        // 当前的incident下面没有treatment的时候删除当前的incident
        if (value.treatmentList.length === 0) {
          incidentIds.push(value.id);
          delete targetClaimEntities.incidentListMap[key];
        }
      }
    });

    targetClaimProcessData.incidentList = without(
      targetClaimProcessData.incidentList,
      ...incidentIds
    );
  });
};
