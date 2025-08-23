import { produce }  from 'immer';
import lodash from 'lodash';

const therapeuticDrugListUpdate = (state: any, action: any) => {
  const { otherProcedureId, therapeuticMonth, changedFields } = action.payload;

  const nextState = produce(state, (draftState) => {
    const therapeuticMonthList =
      draftState.claimEntities?.otherProcedureListMap?.[otherProcedureId]?.therapeuticMonthList ||
      [];
    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList = lodash
      .chain(therapeuticMonthList)
      .map((item) =>
        item.therapeuticMonth === therapeuticMonth
          ? {
              ...item,
              ...changedFields,
            }
          : item
      )
      .value();
  });

  return { ...nextState };
};

export default therapeuticDrugListUpdate;
