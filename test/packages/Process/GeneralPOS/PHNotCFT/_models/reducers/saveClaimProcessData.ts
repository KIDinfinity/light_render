import { produce }  from 'immer';
import lodash from 'lodash';
import TaskDefKey from 'enum/TaskDefKey';

const saveClaimProcessData = (state: any, action: any) => {
  const { claimProcessData, init = false, taskDefKey, snapshotData = false } = action.payload;
  if (taskDefKey === TaskDefKey.PH_POS_ACT003)
    lodash.get(claimProcessData, 'businessData.approvalPosDecision.posDecision', 'A');

  if (taskDefKey === TaskDefKey.PH_POS_ACT006)
    lodash.get(claimProcessData, 'businessData.transactionTypes[0].decision', 'A');

  const currentProcessData = state.claimProcessData;

  const claimData = {
    ...currentProcessData,
    ...claimProcessData,
    businessData: {
      ...currentProcessData?.businessData,
      ...claimProcessData?.businessData,
    },
  };

  if (
    lodash.isEmpty(claimData?.businessData?.policyInfo?.policyInfoList) &&
    !lodash.isEmpty(claimData?.businessData?.policyInfo?.applyToPolicyInfoList)
  ) {
    lodash.set(
      claimData,
      'businessData.policyInfo.policyInfoList',
      claimData?.businessData?.policyInfo?.applyToPolicyInfoList
    );
  }

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = claimData;
  });

  return nextState;
};

export default saveClaimProcessData;
