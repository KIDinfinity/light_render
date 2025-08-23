import { produce }  from 'immer';

const removeDecisionBranch = (state: any, action: any) => {
  const { id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.branchVO.branchList = draftState.decisionEditData.branchVO.branchList?.filter(
      (el) => el.id !== id
    );
  });

  return { ...nextState };
};

export default removeDecisionBranch;
