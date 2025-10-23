export default (state: any, action: any) => {
  return {
    ...state,
    transactionTypes: action?.payload?.transactionTypes,
  };
};
