import { produce }  from 'immer';

const otherProcedurePayableReasonDateUpdate = (state: any, action: any) => {
  const { radioDateList, id, isAdd } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (isAdd) {
      draftState.otherProcedurePayableItemAdd = {
        ...draftState.otherProcedurePayableItemAdd,
        radioTherapyReasonDate1: radioDateList[0],
        radioTherapyReasonDate2:
          radioDateList.length > 1 ? radioDateList[radioDateList.length - 1] : '',
      };
    } else {
      draftState.claimEntities.otherProcedurePayableListMap[id] = {
        ...draftState.claimEntities.otherProcedurePayableListMap[id],
        radioTherapyReasonDate1: radioDateList[0],
        radioTherapyReasonDate2:
          radioDateList.length > 1 ? radioDateList[radioDateList.length - 1] : '',
      };
    }
  });

  return { ...nextState };
};

export default otherProcedurePayableReasonDateUpdate;
