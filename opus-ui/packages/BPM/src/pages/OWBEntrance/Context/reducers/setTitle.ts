export default (state: any, action: any) => {
  if(state.title !== action.payload) {
    state.title = action.payload
  }
  return state;
};
