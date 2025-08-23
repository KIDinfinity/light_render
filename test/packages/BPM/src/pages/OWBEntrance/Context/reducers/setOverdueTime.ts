export default (state: any, action: any) => {
  const { overdueTimeRender } = action.payload;
  state.overdueTimeRender = overdueTimeRender
  return state;
};
