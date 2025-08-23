import { produce }  from 'immer';

const removeICUItem = (state: any, action: any) => {
  const { treatmentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const treatmentListMap = draftState.claimEntities.treatmentListMap[treatmentId];
    // eslint-disable-next-line no-param-reassign
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
