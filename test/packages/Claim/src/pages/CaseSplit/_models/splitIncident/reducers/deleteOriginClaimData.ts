import { produce } from 'immer';
import { isString, forEach, without } from 'lodash';
import { getMapValueIds } from '../../functions';

export default (state: any, { payload: { id } }: any) => {
  return produce(state, (draft: any) => {
    if (!isString(id)) {
      return draft;
    }

    const { originClaimEntities, originClaimProcessData } = draft;

    const incidentIds: string[] = [];
    const treatmentMapIncident: object = {};

    // 删除 treatment
    forEach(originClaimEntities.treatmentListMap, (value, key) => {
      if (value.incidentId === id && value.selected) {
        treatmentMapIncident[value.id] = value.incidentId;
        delete originClaimEntities.treatmentListMap[key];
      }
    });

    // 删除 incident
    forEach(originClaimEntities.incidentListMap, (value, key) => {
      if (value.id === id && value.selected) {
        value.treatmentList = without(
          value.treatmentList,
          ...getMapValueIds(treatmentMapIncident, value.id)
        );

        // 当前的incident下面没有treatment的时候删除当前的incident
        if (value.treatmentList.length === 0) {
          incidentIds.push(value.id);
          delete originClaimEntities.incidentListMap[key];
        }
      }
    });

    originClaimProcessData.incidentList = without(
      originClaimProcessData.incidentList,
      ...incidentIds
    );
  });
};
