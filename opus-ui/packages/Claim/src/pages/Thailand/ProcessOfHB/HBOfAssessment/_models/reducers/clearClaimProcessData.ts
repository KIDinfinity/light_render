const clearClaimProcessData = (state: any) => {
  return {
    ...state,
    claimProcessData: {},
    claimEntities: {},
  };
};

export default clearClaimProcessData;
