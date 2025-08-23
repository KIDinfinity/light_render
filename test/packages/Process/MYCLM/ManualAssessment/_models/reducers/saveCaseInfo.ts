export default (state: any, action: any) => {
  const { caseInfo } = action.payload;
  state.claimProcessData.caseInfo = caseInfo
  return state;
}
