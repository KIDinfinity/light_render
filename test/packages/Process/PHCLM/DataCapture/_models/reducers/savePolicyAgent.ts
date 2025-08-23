import { produce }  from 'immer';

const savePolicyAgent = (state: any, { payload }: any) => {
  const { policyAgent } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.policyAgent = policyAgent;
  });
  return { ...nextState };
};

export default savePolicyAgent;
