export default (state: any, action: any) => {
  state.isRefreshBpm = action.payload;
  return state;
};
