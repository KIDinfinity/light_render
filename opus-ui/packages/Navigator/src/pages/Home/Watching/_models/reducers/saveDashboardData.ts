import { produce } from 'immer';

const saveDashboardData = (state: any, { payload }: any) => {
  const { datas } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.dashboardData.datas = datas;
  });

  return { ...nextState };
};

export default saveDashboardData;
