export default (state: any, action: any) => {
  const { scenarioCurrentTab } = action.payload;
  return { ...state, scenarioCurrentTab };
};
