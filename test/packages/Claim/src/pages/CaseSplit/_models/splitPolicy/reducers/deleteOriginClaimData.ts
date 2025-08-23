import { produce } from 'immer';
import { isString, forEach, without } from 'lodash';
import { getMapValueIds } from '../../functions';

export default (state: any, { payload: { policyNo } }: any) => {
  return produce(state, (draft: any) => {
    if (!isString(policyNo)) {
      return draft;
    }

    const { originClaimEntities, originClaimProcessData } = draft;

    const claimPayableIs: string[] = [];
    const lifeMapClaimPayable: object = {};
    const treatmentMapClaimPayable: object = {};

    // 删除 treatment payable
    forEach(originClaimEntities.treatmentPayableListMap, (value, key) => {
      if (value.policyNo === policyNo && value.selected) {
        treatmentMapClaimPayable[value.id] = value.payableId;
        delete originClaimEntities.treatmentPayableListMap[key];
      }
    });

    // 删除 life payable
    forEach(originClaimEntities.lifePayableMap, (value, key) => {
      if (value.policyNo === policyNo && value.selected) {
        lifeMapClaimPayable[value.id] = value.payableId;
        delete originClaimEntities.lifePayableMap[key];
      }
    });

    // 删除 claim payable
    forEach(originClaimEntities.claimPayableListMap, (value, key) => {
      if (value.policyNo === policyNo && value.selected) {
        // 排除当前payable对应的被删除treatment payable
        value.treatmentPayableList = without(
          value.treatmentPayableList,
          ...getMapValueIds(treatmentMapClaimPayable, value.id)
        );
        // 排除当前payable对应的被删除life payable（目前一个claim payable下面只有一个life payable）
        const lifePayableIds: string[] = getMapValueIds(lifeMapClaimPayable, value.id);
        if (lifePayableIds.length > 0) {
          delete value.lifePayable;
        }

        // 当前的claim payable 下面没有treatment payable和life payable的时候删除当前的claim payable
        if (value.treatmentPayableList.length === 0 && !value.lifePayable) {
          claimPayableIs.push(value.id);
          delete originClaimEntities.claimPayableListMap[key];
        }
      }
    });

    originClaimProcessData.claimPayableList = without(
      originClaimProcessData.claimPayableList,
      ...claimPayableIs
    );
  });
};
