import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import otherProcedurePayableReasonDateUpdate from './otherProcedurePayableReasonDateUpdate';

const otherProcedurePayableReasonDateGroupRemove = (state: any, action: any) => {
  const { id, deleteDate, isAdd = false } = action.payload;
  const nextState: any = produce(state, (draftState: any) => {
    const item = isAdd
      ? draftState.otherProcedurePayableItemAdd
      : draftState.claimEntities.otherProcedurePayableListMap[id];

    const newRadioDateList = lodash
      .chain(item.radioDateList)
      .filter((el: any) => {
        return moment(el).format('l') !== moment(deleteDate).format('l');
      })
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
        ...item,
        radioDateList: newRadioDateList,
      };
    }
  });
  const newState = otherProcedurePayableReasonDateUpdate(nextState, {
    type: 'otherProcedurePayableReasonDateUpdate',
    payload: {
      radioDateList: isAdd
        ? nextState.otherProcedurePayableItemAdd.radioDateList
        : nextState.claimEntities.otherProcedurePayableListMap[id].radioDateList,
      id,
      isAdd,
    },
  });

  return { ...newState };
};

export default otherProcedurePayableReasonDateGroupRemove;
