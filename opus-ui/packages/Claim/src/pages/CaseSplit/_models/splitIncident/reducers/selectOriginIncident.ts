import { produce } from 'immer';
import { forEach, uniq } from 'lodash';

export default (state: any, { payload: { id, checked } }: any) => {
  return produce(state, (draft: any) => {
    const { originClaimEntities } = draft;
    let treatmentIds: string[] = [];

    // 选中当前incident
    forEach(originClaimEntities.incidentListMap, (item: any) => {
      if (item.id === id) {
        item.selected = checked;
        treatmentIds = item.treatmentList;
      }
    });

    treatmentIds = uniq(treatmentIds);
    // 自动选中当前incident下面所有treatment
    forEach(originClaimEntities.treatmentListMap, (item: any) => {
      if (treatmentIds.includes(item.id)) {
        item.selected = checked;
      }
    });
  });
};
