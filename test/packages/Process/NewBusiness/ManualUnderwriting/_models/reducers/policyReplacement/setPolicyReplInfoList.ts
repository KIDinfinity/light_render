import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    replacementInfoList: any[];
  };
};

export default (state: any, action: TAction) => {
  const { replacementInfoList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.policyReplacement.replacementInfoList = replacementInfoList;
  });
  return { ...nextState };
};
