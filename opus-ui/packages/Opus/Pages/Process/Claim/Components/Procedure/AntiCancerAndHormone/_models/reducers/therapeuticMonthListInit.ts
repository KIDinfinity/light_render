import { produce } from 'immer';

const therapeuticMonthListInit = (state: any, action: any) => {
  const { otherProcedureId, list } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList = list;
  });

  return { ...nextState };
};

export default therapeuticMonthListInit;
