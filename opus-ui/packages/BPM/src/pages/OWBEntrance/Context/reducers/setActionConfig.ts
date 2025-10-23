export default (state: any, action: any) => {
  const { actionConfig } = action.payload;
  state.actionConfig = actionConfig
  return state;
};
