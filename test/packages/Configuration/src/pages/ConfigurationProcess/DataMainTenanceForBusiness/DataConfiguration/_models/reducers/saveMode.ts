export default (state: any, action: any) => {
  const { mode } = action.payload;
  return {
    ...state,
    mode,
  };
};
