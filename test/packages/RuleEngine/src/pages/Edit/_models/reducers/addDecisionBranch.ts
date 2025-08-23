import { produce }  from 'immer';
import getDecisionBranch from '../../Utils/getDecisionBranch';

const addDecisionBranch = (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { nodeId } = draftState.decisionEditData.branchVO.branchList[0];

    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.branchVO.branchList = [
      ...draftState.decisionEditData.branchVO.branchList,
      getDecisionBranch({ nodeId }),
    ];
  });

  return { ...nextState };
};

export default addDecisionBranch;
