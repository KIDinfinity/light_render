export default function saveinsured360(state: any, action: any) {
  const {
    payload: { insuredPolicyIdList, claimHistoryList, policyInfoList, posHistoryList, clientInfo },
  } = action;

  return {
    ...state,
    insuredPolicyIdList,
    claimHistoryList,
    policyInfoList,
    posHistoryList,
    clientInfo,
  };
}
