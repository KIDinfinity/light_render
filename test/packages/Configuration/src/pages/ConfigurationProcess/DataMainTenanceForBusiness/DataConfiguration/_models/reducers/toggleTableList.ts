export default (state: any, action: any) => {
  const { showTableList } = action.payload;
  return {
    ...state,
    showTableList,
  };
};
