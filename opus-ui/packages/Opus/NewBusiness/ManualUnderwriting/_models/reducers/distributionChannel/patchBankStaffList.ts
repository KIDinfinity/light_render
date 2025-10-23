import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    bankStaffList: Record<string, any>;
  };
};

export default (state: any, action: TAction) => {
  const { bankStaffList } = action.payload;
  const old = state.modalData.distributionChannel.bankStaffList;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.distributionChannel.bankStaffList = {
      ...old,
      ...bankStaffList,
    };
  });
  return { ...nextState };
};
