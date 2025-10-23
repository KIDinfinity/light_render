export default (state: any, action: any) => {
  const { listPage } = action.payload;

  return {
    ...state,
    listPage,
  };
};
