import { produce } from 'immer';
import lodash from 'lodash';
export default function saveMemoReason(state: any, { payload }) {
  const { groupId, dataId, memoIdx, index, field, value, memoSubTypeDesc = '' } = payload;
  return produce(state, (draftState: any) => {
    const reasonGroup = draftState.currentReasonGroups.find((item) => item?.id === groupId);
    const reason = reasonGroup?.reasonDetails?.find((item) => item?.id === dataId);

    if (reason) {
      if (!reason?.pendingMemoList?.[memoIdx]?.pendingMemoSubInfoList) {
        reason.pendingMemoList[memoIdx] = {
          ...reason.pendingMemoList[memoIdx],
          pendingMemoSubInfoList: [{ [field]: '' }],
        };
      }

      lodash.set(
        reason,
        `pendingMemoList[${memoIdx}].pendingMemoSubInfoList[${index}][${field}]`,
        value
      );
      if (field === 'subTypeCode') {
        lodash.set(
          reason,
          `pendingMemoList[${memoIdx}].pendingMemoSubInfoList[${index}].subRemark`,
          memoSubTypeDesc
        );
      }
    }
  });
}
