import { produce }  from 'immer';
import lodash from 'lodash';

const therapeuticDateListAdd = (state: any, action: any) => {
  const { otherProcedureId, therapeuticDateList, therapeuticMonth } = action.payload;
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
              therapeuticDateList: JSON.stringify(
                lodash.orderBy([...therapeuticDateList, ...JSON.parse(item.therapeuticDateList)])
              ),
            }
          : item;
      })
      .value();
  });

  return { ...nextState };
};

export default therapeuticDateListAdd;
