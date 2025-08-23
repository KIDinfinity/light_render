import { produce } from 'immer';

export default function saveMemoReason(state: any, { payload }) {
  const { groupId, dataId, memoIdx, index, field, value } = payload;
  return produce(state, (draftState: any) => {
    // const { listMemoSubType } = draftState;
    const reasonGroup = draftState.currentReasonGroups.find((item) => item?.id === groupId);
    const reason = reasonGroup?.reasonDetails?.find((item) => item?.id === dataId);
    if (reason) {
      const subInfo = reason.pendingMemoList[memoIdx].pendingMemoSubInfoList[index];
      subInfo[field] = value;
    }
    // if(field === 'subTypeCode') {
    //   const memoCode = reason.pendingMemoList[memoIdx].memoCode;
    //   subInfo.memoRemark = lodash.get(lodash.get(listMemoSubType, `${reason?.reasonCode}`, []), memoCode, {})
    //     .memoSubType?.find((memoSubType: any) => memoSubType?.reasonCode === value)
    //     ?.reasonDesc
    // }
  });
}
