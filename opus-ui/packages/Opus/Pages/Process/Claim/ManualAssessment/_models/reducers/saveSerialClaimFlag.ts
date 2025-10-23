import { produce } from 'immer';

const saveSerialClaimFlag = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.serialClaimFlag = !draftState.serialClaimFlag;
  });

  return { ...nextState };
};

export default saveSerialClaimFlag;
