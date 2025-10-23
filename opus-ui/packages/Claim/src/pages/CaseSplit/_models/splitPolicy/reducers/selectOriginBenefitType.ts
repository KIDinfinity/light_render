import { produce } from 'immer';
import { forEach, uniq, values } from 'lodash';
import getExtraClaimPayable from '../../functions/getExtraClaimPayable';

export default (state: any, { payload: { id, checked } }: any) => {
  return produce(state, (draft: any) => {
    const { originClaimEntities } = draft;
    let claimPayableIds: string[] = [];
    const { treatmentPayableListMap, lifePayableMap, claimPayableListMap } = originClaimEntities;
    // treatment payable 和 life payable当做同一层级处理
    const existTreatment = values({
      ...treatmentPayableListMap,
      ...lifePayableMap,
    });
    // 获取不存在 treatment payable和life payable的claim payable
    const extraClaim: any[] = getExtraClaimPayable(claimPayableListMap, existTreatment);

    // 选中treatment payable
    forEach(originClaimEntities.treatmentPayableListMap, (item: any) => {
      if (item.id === id) {
        item.selected = checked;
        claimPayableIds.push(item.payableId);
      }
    });

    // 选中life payable
    forEach(originClaimEntities.lifePayableMap, (item: any) => {
      if (item.id === id) {
        item.selected = checked;
        claimPayableIds.push(item.payableId);
      }
    });

    claimPayableIds = uniq(claimPayableIds);
    // 自动选中claim payable
    forEach(originClaimEntities.claimPayableListMap, (item: any) => {
      if (
        claimPayableIds.includes(item.id) ||
        (extraClaim.some((extClaim: any) => extClaim.id === item.id) && item.id === id) // 自动选择没有treatment payable和life payable的claim payable
      ) {
        item.selected = checked;
      }
    });
  });
};
