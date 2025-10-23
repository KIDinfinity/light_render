export default (state: any, action: any) => {

  const { listPage, isOrigin } = action.payload;

  const originRows =
    !state?.originRows?.length && isOrigin
      ? {
          originRows: listPage?.rows,
        }
      : {};
  return {
    ...state,
    listPage,
    ...originRows,
  };
};
