import { produce } from 'immer';

const saveSerialClaimTreatmentId = (state: any, { payload = {} }: any) => {
  const { id } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.serialClaimTreatmentId = id;
  });

  return { ...nextState };
};

export default saveSerialClaimTreatmentId;
