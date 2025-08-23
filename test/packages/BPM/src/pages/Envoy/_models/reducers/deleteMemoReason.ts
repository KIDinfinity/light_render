import { produce } from 'immer';

export default function saveMemoReason(state: any, { payload }) {
  const { groupId, dataId, memoIdx, index } = payload;
  return produce(state, (draftState: any) => {
    const reasonGroup = draftState.currentReasonGroups.find((item) => item?.id === groupId);
    const reason = reasonGroup?.reasonDetails?.find((item) => item?.id === dataId);
    if (reason) reason.pendingMemoList[memoIdx].pendingMemoSubInfoList.splice(index, 1);
  });
}
