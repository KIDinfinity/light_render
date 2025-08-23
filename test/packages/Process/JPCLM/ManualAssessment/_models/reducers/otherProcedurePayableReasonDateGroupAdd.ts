import { produce }  from 'immer';
import lodash from 'lodash';
import moment from 'moment';

const otherProcedurePayableReasonDateGroupAdd = (state: any, action: any) => {
  const { id, date, isAdd } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const otherProcedurePayableItem = isAdd
      ? draftState.otherProcedurePayableItemAdd
      : draftState.claimEntities.otherProcedurePayableListMap[id] || {};
    const { radioDateList = [] } = otherProcedurePayableItem;
    if (
      !lodash.includes(
        lodash.map(radioDateList, (el: any) => moment(el).format('YYYYMMDD')),
        moment(date).format('YYYYMMDD')
      )
    ) {
      const newRadioDateList = lodash
        .chain([...radioDateList, date])
        .map((el: any) => moment(el).valueOf())
        .orderBy(
          (item: any) => {
            return moment(item).format('YYYYMMDD');
          },
          ['asc']
        )
        .value();
      if (isAdd) {
        draftState.otherProcedurePayableItemAdd = {
          ...draftState.otherProcedurePayableItemAdd,
          radioDateList: newRadioDateList,
        };
      } else {
        draftState.claimEntities.otherProcedurePayableListMap[id] = {
          ...otherProcedurePayableItem,
          radioDateList: newRadioDateList,
        };
      }
    }
  });

  return { ...nextState };
};

export default otherProcedurePayableReasonDateGroupAdd;
