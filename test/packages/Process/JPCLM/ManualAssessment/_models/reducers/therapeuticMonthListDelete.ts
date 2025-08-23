import { produce }  from 'immer';
import lodash from 'lodash';

const therapeuticMonthListDelete = (state: any, action: any) => {
  const { otherProcedureId, therapeuticMonth } = action.payload;
  const nextState = produce(state, (draftState) => {
    const therapeuticMonthList =
      draftState?.claimEntities?.otherProcedureListMap?.[otherProcedureId]?.therapeuticMonthList ||
      [];

    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList = lodash
      .chain(therapeuticMonthList)
      .filter((item) => item.therapeuticMonth !== therapeuticMonth)
      .value();
  });

  return { ...nextState };
};

export default therapeuticMonthListDelete;
