export default (state: any, action: any) => {
  const { selectedClientId } = action.payload;
  return {
    ...state,
    selectedClientId,
  };
};
