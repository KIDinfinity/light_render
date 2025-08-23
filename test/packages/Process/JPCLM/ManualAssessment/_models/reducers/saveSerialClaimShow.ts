import { produce }  from 'immer';

const saveSerialClaimShow = (state: any, action: any) => {
  const { payableData } = action.payload;

  const nextState = produce(state, (draftState) => {
    draftState.serialClaim.show = true;
    draftState.serialClaim.payableData = payableData;
    draftState.serialClaim.filterParams = payableData;
    draftState.serialClaim.treatmentPayableList = [];
  });

  return { ...nextState };
};

export default saveSerialClaimShow;
