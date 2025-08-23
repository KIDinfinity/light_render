import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

export default function addMemoReason(state: any, { payload }) {
  const { groupId, dataId, memoIdx, value } = payload;
  return produce(state, (draftState: any) => {
    const reasonGroup = draftState.currentReasonGroups.find((item) => item?.id === groupId);
    const reason = reasonGroup?.reasonDetails?.find((item) => item?.id === dataId);
    if (reason) {
      if (!reason.pendingMemoList[memoIdx].pendingMemoSubInfoList?.length) {
        reason.pendingMemoList[memoIdx].pendingMemoSubInfoList = [
          {
            subTypeCode: value,
            id: uuidv4(),
          },
        ];
      } else {
        reason.pendingMemoList[memoIdx].pendingMemoSubInfoList.push({
          subTypeCode: value,
          id: uuidv4(),
        });
      }
    }
  });
}
