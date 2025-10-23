export default (state: any, action: any) => {
  const { tableReport, reportCode } = action.payload;

  return {
    ...state,
    tableReport: {
      ...state.tableReport,
      [reportCode]: tableReport,
    },
  };
};
