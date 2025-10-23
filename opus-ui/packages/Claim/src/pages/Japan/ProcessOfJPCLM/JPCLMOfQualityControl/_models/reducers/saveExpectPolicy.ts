import { produce } from 'immer';

export default (state: any, action: any) => {
  const { expectPolicyList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.claimDatas.expectPolicyList = expectPolicyList;
  });
  return { ...nextState };
};
