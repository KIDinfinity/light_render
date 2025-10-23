export default {
  namespace: 'dashboard',
  state: {
    dashboardList: [
      {
        name: 'dashboard-1',
      },
      {
        name: 'dashboard-2',
      },
    ],
  },
  reducers: {
    createNewDashboard(state) {
      const { dashboardList } = state;
      const { length } = dashboardList;
      const newDashboardList = [
        ...dashboardList,
        {
          name: `dashbaord-${length}`,
        },
      ];

      return {
        ...state,
        dashboardList: newDashboardList,
      };
    },
  },
};
