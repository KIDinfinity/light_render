import { produce } from 'immer';;

type TAction = {
  type: any;
  payload: {
    branchCodeList: any[];
  };
};

export default (state: any, action: TAction) => {
  const { branchCodeList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.distributionChannel.branchCodeList = branchCodeList;
  });
  return { ...nextState };
};
