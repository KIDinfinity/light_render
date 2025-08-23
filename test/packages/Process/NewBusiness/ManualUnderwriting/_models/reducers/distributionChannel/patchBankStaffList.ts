import { produce } from 'immer';;

type TAction = {
  type: any;
  payload: {
    bankStaffList: Record<string, any>;
    servicingBranchList: Record<string, any>;
  };
};

export default (state: any, action: TAction) => {
  const { bankStaffList, servicingBranchList = [] } = action.payload;
  const old = state.modalData.distributionChannel.bankStaffList;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.distributionChannel.bankStaffList = {
      ...old,
      ...bankStaffList,
    };
    const oldBranchList = state.modalData.distributionChannel.servicingBranchList;
    draftState.modalData.distributionChannel.servicingBranchList = {
      ...oldBranchList,
      ...servicingBranchList,
    };
  });
  return { ...nextState };
};
