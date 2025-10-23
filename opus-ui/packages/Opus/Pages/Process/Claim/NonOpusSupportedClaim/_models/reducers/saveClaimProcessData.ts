const saveClaimProcessData = (state: any, action: any) => {
  const businessData = { ...action.payload };

  return {
    ...state,
    businessData,
  };
};

export default saveClaimProcessData;
