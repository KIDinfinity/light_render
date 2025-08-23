export default (state: any, { payload }: any) => {
  const reportCode = state.activeTabKey;
  return {
    ...state,
    reportMetadata: {
      ...state.reportMetadata,
      [reportCode]: {
        ...state.reportMetadata?.[reportCode],
        statisticMetadataList: payload,
      },
    },
  };
};
