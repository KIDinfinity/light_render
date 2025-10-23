import { produce } from 'immer';
import { isString, uniq, forEach, concat } from 'lodash';
import { getMapValueIds } from '../../functions';

export default (state: any, { payload: { policyNo } }: any) => {
  return produce(state, (draft: any) => {
    if (!isString(policyNo)) {
      return draft;
    }

    const { originClaimEntities, originClaimProcessData, targetClaimEntities } = draft;

    const claimPayableIs: string[] = [];
    const lifeMapClaimPayable: object = {};
    const treatmentMapClaimPayable: object = {};

    // 添加 treatment payable
    forEach(targetClaimEntities.treatmentPayableListMap, (value, key) => {
      if (value.policyNo === policyNo && value.selected) {
        treatmentMapClaimPayable[value.id] = value.payableId;
        originClaimEntities.treatmentPayableListMap[key] = value;
      }
    });

    // 添加 life payable
    forEach(targetClaimEntities.lifePayableMap, (value, key) => {
      if (value.policyNo === policyNo && value.selected) {
        lifeMapClaimPayable[value.id] = value.payableId;
        originClaimEntities.lifePayableMap[key] = value;
      }
    });

    // 添加 claim payable
    forEach(targetClaimEntities.claimPayableListMap, (value, key) => {
      if (value.policyNo === policyNo && value.selected) {
        const temp = { ...value };
        temp.treatmentPayableList = getMapValueIds(treatmentMapClaimPayable, temp.id);

        temp.lifePayable = getMapValueIds(lifeMapClaimPayable, temp.id)[0];

        claimPayableIs.push(temp.id);
        originClaimEntities.claimPayableListMap[key] = temp;
      }
    });

    originClaimProcessData.claimPayableList = uniq(
      concat(claimPayableIs, originClaimProcessData.claimPayableList)
    );
  });
};
