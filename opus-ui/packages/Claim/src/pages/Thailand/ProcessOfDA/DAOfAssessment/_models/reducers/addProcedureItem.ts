import { produce } from 'immer';

const addProcedureItem = (state: any, action: any) => {
  const { treatmentId, addProcedureItem } = action.payload;
  const nextState = produce(state, (draftState) => {
    const treatmentItem = draftState.claimEntities.treatmentListMap[treatmentId];

    if (!draftState.claimEntities.treatmentListMap[treatmentId].procedureList) {
      draftState.claimEntities.treatmentListMap[treatmentId].procedureList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].procedureList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].procedureList,
      addProcedureItem.id,
    ];

    draftState.claimEntities.procedureListMap[addProcedureItem.id] = {
      ...addProcedureItem,
      productPlan: treatmentItem.productPlan,
    };
  });

  return { ...nextState };
};

export default addProcedureItem;
