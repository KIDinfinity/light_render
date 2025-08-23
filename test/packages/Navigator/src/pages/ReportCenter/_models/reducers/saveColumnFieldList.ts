export default (state: any, action: any) => {
  const { reportCode, columnFieldList } = action.payload;
  return {
    ...state,
    reportMetadata: {
      ...state.reportMetadata,
      [reportCode]: {
        ...state.reportMetadata[reportCode],
        columnFieldList,
      },
    },
  };
};
