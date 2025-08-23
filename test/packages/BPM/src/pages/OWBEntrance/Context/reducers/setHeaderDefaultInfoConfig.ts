export default (state: any, action: any) => {
  const { defaultHeaderInfoConfig } = action.payload;
  state.defaultHeaderInfoConfig = defaultHeaderInfoConfig
  return state;
};
