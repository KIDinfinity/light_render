import lodash from 'lodash';
import { produce } from 'immer';


const benefitItemGroupUpdate = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState) => {
    const { id, benefitCategory, changedFields } = payload;
    let extra = {};
    if (lodash.size(changedFields) > 0 && lodash.has(changedFields, 'payableAmount')) {
      extra = {
        assessorOverrideAmount: changedFields.payableAmount.value,
      };
    }

    draftState.claimEntities.claimPayableListMap[id] = {
      ...draftState.claimEntities.claimPayableListMap[id],
      ...changedFields,
      ...extra,
    };
  });
  return { ...nextState };
};

export default benefitItemGroupUpdate;
