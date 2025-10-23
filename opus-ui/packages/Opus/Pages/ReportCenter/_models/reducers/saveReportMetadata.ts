export default (state: any, action: any) => {
  const { reportMetadata } = action.payload;
  return {
    ...state,
    reportMetadata,
  };
};
