import { produce }  from 'immer';

const otherProcedureAdd = (state: any, action: any) => {
  const { treatmentId, addOtherProcedureItem } = action.payload;
  const nextState = produce(state, (draftState) => {
    if (!draftState.claimEntities.treatmentListMap[treatmentId].otherProcedureList) {
      draftState.claimEntities.treatmentListMap[treatmentId].otherProcedureList = [];
    }
    draftState.claimEntities.treatmentListMap[treatmentId].otherProcedureList = [
      ...draftState.claimEntities.treatmentListMap[treatmentId].otherProcedureList,
      addOtherProcedureItem.id,
    ];
    draftState.claimEntities.otherProcedureListMap[
      addOtherProcedureItem.id
    ] = addOtherProcedureItem;
  });

  return { ...nextState };
};

export default otherProcedureAdd;
