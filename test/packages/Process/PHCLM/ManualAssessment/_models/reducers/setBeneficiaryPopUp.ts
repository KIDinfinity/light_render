//savePopUpBeneficiary
import { produce } from 'immer';

export default (state: any, action: any) => {
  const { beneficiaryPopUp, payeeId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.beneficiaryPopUp = beneficiaryPopUp;
    if (!beneficiaryPopUp) {
      draftState.fillInPayeeId = void 0;
    }
  });
  return { ...nextState };
};
