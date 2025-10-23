export default (state: any, action: any) => {
  const { templateHeaderHelper } = action.payload;
  state.templateHeaderHelper = templateHeaderHelper;
  return state;
};
