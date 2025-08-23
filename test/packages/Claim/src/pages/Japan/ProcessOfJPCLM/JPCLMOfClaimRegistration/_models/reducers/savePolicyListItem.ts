import { produce } from 'immer';
import lodash from 'lodash';
import { PolicyCategory } from '../../../utils/constant';

const savePolicyListItem = (state: any, action: any) => {
  const { changedFields, policyId } = action.payload;
  const { policyCategoryMap } = state;

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.policyListMap[policyId] = {
      ...draftState.claimEntities.policyListMap[policyId],
      ...changedFields,
    };

    if (lodash.has(changedFields, 'policyNo')) {
      if (changedFields.policyNo.value && policyCategoryMap[changedFields.policyNo.value]) {
        draftState.claimEntities.policyListMap[policyId].policyCategory =
          policyCategoryMap[changedFields.policyNo.value];
      } else if (changedFields.policyNo.value && !policyCategoryMap[changedFields.policyNo.value]) {
        draftState.claimEntities.policyListMap[policyId].policyCategory = PolicyCategory.CR;
      } else if (!changedFields.policyNo.value) {
        draftState.claimEntities.policyListMap[policyId].policyCategory = '';
      }
    }
  });
  return { ...nextState };
};

export default savePolicyListItem;
