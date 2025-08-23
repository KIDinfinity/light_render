import lodash from 'lodash';

export default (reasonGroup, pendingMemoList) => {
  let flag = false;
  const reasonGroupId = reasonGroup?.id || '';
  const reasonDetailId = reasonGroup?.reasonDetails?.[0]?.id || '';
  if (!lodash.isArray(pendingMemoList)) {
    return flag;
  }

  //确保当前所有的pendingMemoList里面的memo都属于当前reason
  flag = lodash.every(
    pendingMemoList,
    (item) => item?.reasonGroupId === reasonGroupId && item?.reasonDetailId === reasonDetailId
  );

  return flag;
};
