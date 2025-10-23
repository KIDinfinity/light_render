const clearClaimProcessData = (state: any) => {
  return {
    ...state,
    claimProcessData: {},
    claimEntities: {},
    policyBackgrounds: {},
    treatmentPayableAddItem: null,
    incidentPayableAddItem: null,
  };
};

export default clearClaimProcessData;
