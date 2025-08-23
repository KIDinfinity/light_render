export default (state: any) => {
  return {
    ...state,
    ...{
      currentReasonGroups: [],
      historyReasonGroups: [],
    },
  };
};
