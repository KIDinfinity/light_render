import { produce } from 'immer';

export default (state: any, action: any) => {
  const { beneficiaryPopUp } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.beneficiaryPopUp = beneficiaryPopUp;
  });
  return { ...nextState };
};
