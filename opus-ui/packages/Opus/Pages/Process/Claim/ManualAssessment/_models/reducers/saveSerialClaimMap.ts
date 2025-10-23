import { produce } from 'immer';

const saveSerialClaimMap = (state: any, { payload }: any) => {
  const { serialClaimMap } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.serialClaimMap = serialClaimMap;
  });

  return { ...nextState };
};

export default saveSerialClaimMap;
