export default (state, action) => {
  state.clientInfoList = action?.payload?.clientInfoList || [];
  return state;
}
