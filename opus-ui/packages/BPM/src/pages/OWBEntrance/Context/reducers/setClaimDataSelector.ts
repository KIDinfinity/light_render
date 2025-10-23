export default (state: any, action: any) => {
  state.claimDataSelector = action.payload
  return state;
};
