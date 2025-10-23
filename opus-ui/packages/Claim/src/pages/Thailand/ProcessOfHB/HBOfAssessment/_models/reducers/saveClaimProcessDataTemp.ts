const saveClaimProcessDataTemp = (state: any, action: any) => {
  return {
    ...state,
    claimProcessDataTemp: action.payload,
  };
};

export default saveClaimProcessDataTemp;
