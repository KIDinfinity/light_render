export default (state: any, action: any) => {
  const { functionCode, sortOrders } = action.payload;
  return {
    ...state,
    sortOrders: {
      ...state.sortOrders,
      [functionCode]: sortOrders,
    },
  };
};
