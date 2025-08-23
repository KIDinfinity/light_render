import { produce }  from 'immer';
import lodash from 'lodash';

const saveDrugsDetailList = (state: any, action: any) => {
  const { otherProcedureId, therapeuticMonth, changedFields } = action.payload;
  const nextState = produce(state, (draftState) => {
    const therapeuticMonthList =
      draftState.claimEntities?.otherProcedureListMap?.[otherProcedureId]?.therapeuticMonthList ||
      [];
    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList = lodash
      .chain(therapeuticMonthList)
      .map((item) => {
        return item.therapeuticMonth === therapeuticMonth
          ? {
              ...item,
              ...changedFields,
            }
          : item;
      })
      .value();
  });
  return { ...nextState };
};

export default saveDrugsDetailList;
