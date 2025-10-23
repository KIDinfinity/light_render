export default (state: any, action: any) => {
  const { searchDefault, reportCode } = action.payload;
  return {
    ...state,
    searchDefault: {
      ...state.searchDefault,
      [reportCode]: searchDefault,
    },
  };
};
