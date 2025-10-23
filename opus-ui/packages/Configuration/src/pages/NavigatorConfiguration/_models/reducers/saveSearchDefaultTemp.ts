export default (state: any, action: any) => {
  const { searchDefaultTemp } = action.payload;
  return {
    ...state,
    searchDefaultTemp,
  };
};
