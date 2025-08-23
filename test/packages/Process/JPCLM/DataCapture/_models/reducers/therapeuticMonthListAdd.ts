import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';

const therapeuticMonthListAdd = (state: any, action: any) => {
  const { otherProcedureId, therapeuticDateList } = action.payload;
  const nextState = produce(state, (draftState) => {
    const therapeuticMonth = moment(therapeuticDateList[0]).format('YYYY-M') || '';

    const therapeuticMonthListItem = {
      therapeuticMonth,
      therapeuticDateList: JSON.stringify(lodash.orderBy(therapeuticDateList || [])),
      therapeuticDrugList: '[]',
    };

    draftState.claimEntities.otherProcedureListMap[
      otherProcedureId
    ].therapeuticMonthList = lodash.orderBy(
      [
        ...(draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList ||
          []),
        therapeuticMonthListItem,
      ],
      'therapeuticMonth'
    );
  });

  return { ...nextState };
};

export default therapeuticMonthListAdd;
