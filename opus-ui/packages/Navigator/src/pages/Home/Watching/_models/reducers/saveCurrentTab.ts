const saveCurrentTab = (state: any, { payload }: any) => {
  const { currentTab } = payload;
  state.dashboardData.currentTab = currentTab;
  return state;
};

export default saveCurrentTab;
