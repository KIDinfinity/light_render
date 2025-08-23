import { produce } from 'immer';

const saveDashboardData = (state: any, { payload }: any) => {
  const { show } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.dashboardData.show = show;
  });

  return { ...nextState };
};

export default saveDashboardData;
