export default (state: any, action: any) => {
  const { headerInfoRender } = action.payload;
  state.headerInfoRender = headerInfoRender;
  return state;
};
