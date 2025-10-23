import lodash from 'lodash';
export default (item) => {
  let displayReasonFlag = true;
  //针对TH NB 如果由于statusChangeReason为copy导致的pendingMemoList为空，需要隐藏掉整条reason
  const pendingMemoList = item?.reasonDetails?.[0]?.pendingMemoList;
  if (lodash.isEmpty(pendingMemoList)) {
    return displayReasonFlag;
  }
  displayReasonFlag = !lodash.every(pendingMemoList, { statusChangeReason: 'copy' });
  return displayReasonFlag;
};
