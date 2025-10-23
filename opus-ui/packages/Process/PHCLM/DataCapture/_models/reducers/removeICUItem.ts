import { produce } from 'immer';

const removeICUItem = (state: any, action: any) => {
  const { treatmentId } = action.payload;

  const nextState = produce(state, (draftState) => {
    const treatmentListMap = draftState.claimEntities.treatmentListMap[treatmentId];
    draftState.claimEntities.treatmentListMap[treatmentId] = {
      ...treatmentListMap,
      therapiesType: null,
      icuFromDate: null,
      icuToDate: null,
      icuDays: null,
      icu: 0,
    };
  });

  return { ...nextState };
};

export default removeICUItem;
