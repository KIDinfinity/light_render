import { produce } from 'immer';

const therapeuticMonthFirstDateDelete = (state: any, action: any) => {
  const { otherProcedureId, firstTreatmentDate } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList =
      draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList?.filter(
        (listItem: any) => listItem.firstTreatmentDate !== firstTreatmentDate
      );
  });

  return { ...nextState };
};

export default therapeuticMonthFirstDateDelete;
