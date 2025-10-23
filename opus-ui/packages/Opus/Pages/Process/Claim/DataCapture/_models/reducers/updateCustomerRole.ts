export default (state, action) => {
  const clientInfoList = action?.payload?.clientInfoList || [];

  const insuredId = state?.claimProcessData?.insured?.clientId;

  const insuredInfo = clientInfoList.find(({ clientId }) => clientId === insuredId);
  if (insuredId && insuredInfo) {
    state.claimProcessData.insured.customerRole = insuredInfo.customerRole;
  }

  const claimantId = state?.claimProcessData?.claimant?.clientId;

  const claimantInfo = clientInfoList.find(({ clientId }) => clientId === claimantId);
  if (claimantId && claimantInfo) {
    state.claimProcessData.claimant.customerRole = claimantInfo?.customerRole;
  }

  state.clientInfoList = clientInfoList;
  return state;
};
