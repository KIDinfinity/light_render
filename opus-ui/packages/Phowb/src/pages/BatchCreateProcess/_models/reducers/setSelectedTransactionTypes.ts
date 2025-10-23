export default (state: any, action: any) => {
  return {
    ...state,
    selectedTransactionTypes: action?.payload?.selectedTransactionTypes,
  };
};
