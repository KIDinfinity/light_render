import { produce }  from 'immer';
import lodash from 'lodash';

const therapeuticDateListDelete = (state: any, action: any) => {
  const { otherProcedureId, therapeuticDate } = action.payload;
  const nextState = produce(state, (draftState) => {
    const therapeuticMonthList =
      draftState.claimEntities?.otherProcedureListMap?.[otherProcedureId]?.therapeuticMonthList ||
      [];

    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList = lodash
      .chain(therapeuticMonthList)
      .map((item) => ({
        ...item,
        therapeuticDateList: JSON.stringify(
          lodash.filter(JSON.parse(item.therapeuticDateList), (e) => e !== therapeuticDate)
        ),
      }))
      .value();
  });

  return { ...nextState };
};

export default therapeuticDateListDelete;
