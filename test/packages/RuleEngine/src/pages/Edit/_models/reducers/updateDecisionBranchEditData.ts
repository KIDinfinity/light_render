import lodash from 'lodash';
import { produce }  from 'immer';

const updateDecisionBranchEditData = (state: any, action: any) => {
  const { changedFields, id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.decisionEditData.branchVO.branchList = lodash.map(
      draftState.decisionEditData.branchVO.branchList,
      (branch: any) => {
        return branch.id === id
          ? {
              ...branch,
              ...changedFields,
            }
          : branch;
      }
    );
  });

  return { ...nextState };
};

export default updateDecisionBranchEditData;
