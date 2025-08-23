import { produce }  from 'immer';

const accidentBenefitPayableItemUpdate = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { changedFields, id } = action.payload;
    draftState.claimEntities.accidentBenefitPayableListMap[id] = {
      ...state.claimEntities.accidentBenefitPayableListMap[id],
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default accidentBenefitPayableItemUpdate;
