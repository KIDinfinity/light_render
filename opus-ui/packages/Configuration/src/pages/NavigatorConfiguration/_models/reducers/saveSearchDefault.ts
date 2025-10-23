export default (state: any, action: any) => {
  const { searchDefault } = action.payload;
  return {
    ...state,
    searchDefault,
  };
};
