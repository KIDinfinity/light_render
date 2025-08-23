export default (state: any, action: any) => {
  const { customizationButtonConfig } = action.payload;
  state.customizationButtonConfig = customizationButtonConfig
  return state;
};
