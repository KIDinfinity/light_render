export default (state: any, action: any) => {
  const { headerInfoConfig } = action.payload;
  state.headerInfoConfig = headerInfoConfig
  return state;
};
