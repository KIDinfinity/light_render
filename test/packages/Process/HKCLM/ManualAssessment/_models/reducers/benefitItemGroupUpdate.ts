import lodash from 'lodash';
import { produce }  from 'immer';

const benefitItemGroupUpdate = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState) => {
    const { groupBy, benefitCategory, changedFields } = payload;
    let extra = {};
    if (lodash.size(changedFields) > 0 && lodash.has(changedFields, 'payableAmount')) {
      extra = {
        assessorOverrideAmount: changedFields.payableAmount.value,
      };
    }

    switch (benefitCategory) {
      case 'C':
        lodash.forEach(groupBy, (item) => {
          const { id } = item;
          draftState.claimEntities.treatmentPayableListMap[id] = {
            ...draftState.claimEntities.treatmentPayableListMap?.[id],
            ...changedFields,
            ...extra,
          };
        });
        break;
      case 'A':
        lodash.forEach(groupBy, (item) => {
          const { id } = item;
          draftState.claimEntities.accidentBenefitPayableListMap[id] = {
            ...draftState.claimEntities.accidentBenefitPayableListMap?.[id],
            ...changedFields,
            ...extra,
          };
        });
        break;
      default:
        break;
    }
  });
  return { ...nextState };
};

export default benefitItemGroupUpdate;
