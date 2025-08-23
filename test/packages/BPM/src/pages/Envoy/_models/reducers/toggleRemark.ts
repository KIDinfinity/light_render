export default (state, action) => {
  const { id, showRemark } = action?.payload || {};
  state.currentReasonGroups?.some(reasonGroup =>
    reasonGroup?.reasonDetails?.some(details =>
      details.pendingMemoList.some(memo => {
        if(memo?.id === id) {
          memo.showRemark = showRemark;
          memo.pendingMemoSubInfoList = showRemark? [{
            subRemark: '',
          }] : []
          return true;
        }
      })
    ))
}
