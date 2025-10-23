import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    policyReplacementFlag: string;
  };
};

export default (state: any, action: TAction) => {
  const { policyReplacementFlag } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.policyReplacement.policyReplacementFlag = policyReplacementFlag;
  });
  return { ...nextState };
};
