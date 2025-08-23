const saveClaimProcessData = (state: any, action: any) => {
  const readOnly = {
    caseRelevantSubmissionBatchInfo: {
      requestType: action.payload?.requestType,
      submissionNo: action.payload?.submissionNo,
      submissionChannel: action.payload?.submissionChannel,
      submissionDate: action.payload?.submissionDate,
      submissionTime: action.payload?.submissionTime,
      clientId: action.payload?.clientId,
      clientName: action.payload?.clientName,
      businessData: action.payload?.businessData,
    },
  };
  const searchCaseList = action.payload?.udSelectedCaseList || [];
  const attachList = action.payload?.udDocCaseRelationList || [];

  return {
    ...state,
    processData: action.payload,
    readOnly,
    searchCaseList,
    attachList,
  };
};

export default saveClaimProcessData;
