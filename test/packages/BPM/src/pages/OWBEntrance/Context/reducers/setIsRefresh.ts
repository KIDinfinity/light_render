export default (state: any, action: any) => {
  state.isRefresh = action.payload;
  return state;
};
