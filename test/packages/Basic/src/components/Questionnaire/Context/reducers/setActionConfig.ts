export default (state: any, action: any) => {
  const { actionConfig } = action.payload;
  return {
    ...state,
    actionConfig,
  };
};
