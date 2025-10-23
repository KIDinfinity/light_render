export default (state: any, action: any) => {
  const { showDuplicate } = action.payload;
  return {
    ...state,
    showDuplicate,
  };
};
