const clearClaimProcessData = (state: any) => {
  return {
    ...state,
    claimProcessData: null,
    claimEntities: null,
  };
};

export default clearClaimProcessData;
