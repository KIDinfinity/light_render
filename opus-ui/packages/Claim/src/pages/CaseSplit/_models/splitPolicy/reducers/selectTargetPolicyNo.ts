import { produce } from 'immer';
import { forEach, uniq } from 'lodash';

export default (state: any, { payload: { policyNo, checked } }: any) => {
  return produce(state, (draft: any) => {
    const { targetClaimEntities } = draft;
    let claimPayableIds: string[] = [];
    // let incidentIds: string[] = [];
    // let treatmentIds: string[] = [];

    // 选中treatment payable
    forEach(targetClaimEntities.treatmentPayableListMap, (item: any) => {
      if (item.policyNo === policyNo) {
        item.selected = checked;
        claimPayableIds.push(item.payableId);
      }
    });

    // 选中life payable
    forEach(targetClaimEntities.lifePayableMap, (item: any) => {
      if (item.policyNo === policyNo) {
        item.selected = checked;
        claimPayableIds.push(item.payableId);
      }
    });

    claimPayableIds = uniq(claimPayableIds);
    // 自动选中claim payable
    forEach(targetClaimEntities.claimPayableListMap, (item: any) => {
      if (claimPayableIds.includes(item.id) || item.policyNo === policyNo) {
        item.selected = checked;
      }
    });
  });
};
