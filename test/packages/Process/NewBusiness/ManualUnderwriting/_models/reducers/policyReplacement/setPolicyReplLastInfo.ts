import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    changedFields: any;
  };
};

export default (state: any, action: TAction) => {
  const { changedFields } = action.payload;
  const old = state?.modalData?.policyReplacement?.replacementLastInfo;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.policyReplacement.replacementLastInfo = { ...old, ...changedFields };
  });
  return { ...nextState };
};
