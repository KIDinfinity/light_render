export default (state: any, { payload }: any) => {
  const { taskDetail }: any = payload;

  const {
    caseNo,
    processInstanceId,
    claimNo,
    businessNo,
    clientId,
    insuredId,
    caseCategory,
    customerType,
    inquiryBusinessNo,
  } = taskDetail;

  return {
    ...state,
    taskInfo: {
      ...state.taskInfo,
      businessNo: businessNo || claimNo || inquiryBusinessNo || '',
      caseCategory,
      customerType: customerType || '',
      insuredId: insuredId || state?.taskInfo?.insuredId,
      // 这个值只是为了监听变化
      changeId: caseNo || processInstanceId || claimNo || businessNo || clientId || inquiryBusinessNo,
    },
  };
};
