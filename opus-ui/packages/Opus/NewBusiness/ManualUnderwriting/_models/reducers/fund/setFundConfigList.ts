import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    fundConfigList: any[];
  };
};

export default (state: any, action: TAction) => {
  const { fundConfigList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.fund.fundConfigList = fundConfigList;
  });
  return { ...nextState };
};
