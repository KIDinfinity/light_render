import { produce } from 'immer';

export default (state: any, action: any) => {
  const { changedFields, groupId, treatmentId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const treatmentItem = draftState.claimEntities?.treatmentListMap?.[treatmentId];
    treatmentItem.opTreatmentList = treatmentItem.opTreatmentList?.map((item) => {
      if (item?.group !== groupId) return item;
      return {
        ...item,
        ...changedFields,
      };
    });
  });

  return { ...nextState };
};
