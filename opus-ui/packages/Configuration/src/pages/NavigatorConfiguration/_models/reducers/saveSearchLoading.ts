export default (state: any, action: any) => {
  const { searchLoading } = action.payload;
  return {
    ...state,
    searchLoading,
  };
};
