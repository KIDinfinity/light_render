const saveOriginClaimEntities = (state: any, action: any) => {
  return { ...state, ...action.payload };
};

export default saveOriginClaimEntities;
