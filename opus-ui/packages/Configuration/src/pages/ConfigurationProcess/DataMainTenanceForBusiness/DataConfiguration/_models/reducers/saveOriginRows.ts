export default (state: any, action: any) => {
  const { originRows } = action.payload;
  return {
    ...state,
    originRows,
  };
};
