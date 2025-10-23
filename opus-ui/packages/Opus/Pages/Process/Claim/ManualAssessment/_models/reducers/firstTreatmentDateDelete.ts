import { produce } from 'immer';

const firstTreatmentDateAdd = (state: any, action: any) => {
  const { otherProcedureId, treatmentDate } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList =
      draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList?.filter(
        (listItem: any) => listItem.firstTreatmentDate !== treatmentDate
      );
  });

  return nextState;
};

export default firstTreatmentDateAdd;
