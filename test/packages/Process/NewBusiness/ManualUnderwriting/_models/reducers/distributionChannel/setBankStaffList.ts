import { produce } from 'immer';;

type TAction = {
  type: any;
  payload: {
    bankStaffList: any[];
  };
};

export default (state: any, action: TAction) => {
  const { bankStaffList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.distributionChannel.bankStaffList = bankStaffList;
  });
  return { ...nextState };
};
