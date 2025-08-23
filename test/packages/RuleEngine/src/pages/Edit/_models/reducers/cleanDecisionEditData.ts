import { produce } from 'immer';

const cleanDecisionEditData = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData = {};
    draftState.currentBranchVOId = null;
  });

  return { ...nextState };
};

export default cleanDecisionEditData;
