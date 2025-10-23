import { produce } from 'immer';

export default function saveRetryList(state: any, { payload }: any) {
  const { requestedClientRole, requestedClientId, groupId, id } = payload;
  return produce(state, (draftState: any) => {
    const reasonGroup = draftState.currentReasonGroups?.find(
      (reasonGroupItem) => reasonGroupItem.id === groupId
    );
    if (!reasonGroup) return;
    const pendingMemoList = reasonGroup.reasonDetails?.find(
      (reasonDetail) => reasonDetail.id === id
    ).pendingMemoList;
    const pendingMemoInSection = pendingMemoList.filter(
      (memoItem) =>
        memoItem.requestedClientRole === requestedClientRole &&
        memoItem.requestedClientId === requestedClientId
    );
    const groupCode = pendingMemoInSection[0]?.groupCode;
    pendingMemoInSection.map((memoItem) => {
      memoItem.groupCode = groupCode;
    });
  });
}
