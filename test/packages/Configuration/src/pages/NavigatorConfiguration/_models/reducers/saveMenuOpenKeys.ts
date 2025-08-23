export default (state: any, action: any) => {
  const { openKeys } = action.payload;
  return {
    ...state,
    openKeys,
  };
};
