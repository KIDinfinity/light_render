export default (state: any, action: any) => {
  const { confirm } = action.payload;
  return {
    ...state,
    confirm,
  };
};
