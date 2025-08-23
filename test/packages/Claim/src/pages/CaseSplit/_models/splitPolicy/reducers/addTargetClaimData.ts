import { produce } from 'immer';
import { isString, uniq, forEach, concat } from 'lodash';
import { getMapValueIds } from '../../functions';

export default (state: any, { payload: { policyNo } }: any) => {
  return produce(state, (draft: any) => {
    if (!isString(policyNo)) {
      return draft;
    }

    const { originClaimEntities, targetClaimEntities, targetClaimProcessData } = draft;

    const claimPayableIs: string[] = [];
    const lifeMapClaimPayable: object = {};
    const treatmentMapClaimPayable: object = {};

    // 添加payable

    // 添加 treatment payable
    forEach(originClaimEntities.treatmentPayableListMap, (value, key) => {
      if (value.policyNo === policyNo && value.selected) {
        treatmentMapClaimPayable[value.id] = value.payableId;
        targetClaimEntities.treatmentPayableListMap[key] = value;
      }
    });

    // 添加 life payable
    forEach(originClaimEntities.lifePayableMap, (value, key) => {
      if (value.policyNo === policyNo && value.selected) {
        lifeMapClaimPayable[value.id] = value.payableId;
        targetClaimEntities.lifePayableMap[key] = value;
      }
    });

    // 添加 claim payable
    forEach(originClaimEntities.claimPayableListMap, (value, key) => {
      if (value.policyNo === policyNo && value.selected) {
        const temp = { ...value };
        temp.treatmentPayableList = getMapValueIds(treatmentMapClaimPayable, temp.id);

        temp.lifePayable = getMapValueIds(lifeMapClaimPayable, temp.id)[0];

        claimPayableIs.push(temp.id);
        targetClaimEntities.claimPayableListMap[key] = temp;
      }
    });

    targetClaimProcessData.claimPayableList = uniq(
      concat(claimPayableIs, targetClaimProcessData.claimPayableList)
    );
  });
};
