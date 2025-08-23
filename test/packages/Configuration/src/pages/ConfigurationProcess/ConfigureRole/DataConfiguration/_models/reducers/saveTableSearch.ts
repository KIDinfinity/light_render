export default (state: any, action: any) => {
  const { TableSearch } = action.payload;
  return {
    ...state,
    TableSearch,
  };
};
