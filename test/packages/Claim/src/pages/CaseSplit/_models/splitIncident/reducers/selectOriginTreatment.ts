import { produce } from 'immer';
import { forEach, uniq } from 'lodash';

export default (state: any, { payload: { id, checked } }: any) => {
  return produce(state, (draft: any) => {
    const { originClaimEntities } = draft;
    let incidentIds: string[] = [];

    // 选中treatment
    forEach(originClaimEntities.treatmentListMap, (item: any) => {
      if (item.id === id) {
        item.selected = checked;
        incidentIds.push(item.incidentId);
      }
    });

    incidentIds = uniq(incidentIds);
    // 自动选中incident
    forEach(originClaimEntities.incidentListMap, (item: any) => {
      if (incidentIds.includes(item.id)) {
        item.selected = checked;
      }
    });
  });
};
