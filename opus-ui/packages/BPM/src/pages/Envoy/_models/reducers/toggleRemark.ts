export default function (state, action) {
  const { id, showRemark } = action.payload || {};
  const currentReasonGroups = state.currentReasonGroups?.reduce((acc, reasonGroup) => {
    const updatedReasonGroup = {
      ...reasonGroup,
      reasonDetails: reasonGroup.reasonDetails?.map((details) => {
        return {
          ...details,
          pendingMemoList: details.pendingMemoList.map((memo) => {
            if (memo.id === id) {
              return {
                ...memo,
                showRemark,
                pendingMemoSubInfoList: showRemark ? [{ subRemark: '' }] : [],
              };
            }
            return memo;
          }),
        };
      }),
    };
    return [...acc, updatedReasonGroup];
  }, []);

  // 返回更新后的新state
  return {
    ...state,
    currentReasonGroups,
  };
}
