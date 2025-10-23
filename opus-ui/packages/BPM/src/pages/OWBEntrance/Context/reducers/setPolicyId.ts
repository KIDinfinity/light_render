export default (state: any, action: any) => {
  if (state.policyId !== action.payload) {
    state.policyId = action.payload;
  }
  return state;
};
