import { produce } from 'immer';

const addProcedureItem = (state: any, action: any) => {
  const { treatmentId, addProcedureItem } = action.payload;
  const nextState = produce(state, (draftState) => {
    if (!draftState.claimEntities.treatmentListMap[treatmentId].procedureList) {
      draftState.claimEntities.treatmentListMap[treatmentId].procedureList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].procedureList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].procedureList,
      addProcedureItem.id,
    ];
    draftState.claimEntities.procedureListMap[addProcedureItem.id] = addProcedureItem;
  });

  return { ...nextState };
};

export default addProcedureItem;
