import { produce } from 'immer';

const therapeuticMonthFirstDateAdd = (state: any, action: any) => {
  const { otherProcedureId, therapeuticMonthList } = action.payload;

  const newState = produce(state, (draftState: any) => {
    if (draftState.claimEntities?.otherProcedureListMap?.[otherProcedureId]) {
      draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList =
        therapeuticMonthList;
    }
  });
  return { ...newState };
};

export default therapeuticMonthFirstDateAdd;
