import { produce } from 'immer';

const saveCurrentTab = (state: any, { payload }: any) => {
  const { currentTab } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.dashboardData.currentTab = currentTab;
  });

  return { ...nextState };
};

export default saveCurrentTab;
