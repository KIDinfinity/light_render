import { produce } from 'immer';
type TAction = {
  type: any;
  payload: {
    fundList: any[];
  };
};

export default (state: any, action: TAction) => {
  const fundList = action.payload.fundList;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.processData.fund = {
      fundInfoList: fundList,
      fundBaseInfo: draftState?.processData?.fund?.fundBaseInfo,
    };
  });
  return { ...nextState };
};
