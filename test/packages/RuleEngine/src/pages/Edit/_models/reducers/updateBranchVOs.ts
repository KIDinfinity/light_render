import { produce }  from 'immer';

const updateBranchVOs = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.modalStatus.isDecision = false;
  });

  return { ...nextState };
};

export default updateBranchVOs;
