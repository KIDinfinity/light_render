export default (state: any, action: any) => {
  const { functionData } = action.payload;
  return {
    ...state,
    functionData,
  };
};
