const saveReimbursementPercentageMap = (state: any, action: any) => {
  return {
    ...state,
    reimbursementPercentageMap: action.payload?.reimbursementPercentageMap || {},
  };
};

export default saveReimbursementPercentageMap;
