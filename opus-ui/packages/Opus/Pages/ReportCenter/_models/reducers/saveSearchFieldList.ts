export default (state: any, action: any) => {
  const { reportCode, searchFieldList, columnFieldList } = action.payload;
  const target = searchFieldList
    ? {
        searchFieldList,
      }
    : { columnFieldList };
  return {
    ...state,
    reportMetadata: {
      ...state.reportMetadata,
      [reportCode]: {
        ...state.reportMetadata[reportCode],
        ...target,
      },
    },
  };
};
