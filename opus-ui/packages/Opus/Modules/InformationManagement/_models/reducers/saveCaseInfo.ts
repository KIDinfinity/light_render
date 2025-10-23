export default (state, action) => {
  state.caseInfo = action?.payload?.info
  return state;
}
