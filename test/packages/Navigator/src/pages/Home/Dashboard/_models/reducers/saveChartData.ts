import { produce } from 'immer';

export default (state: any, action: any) => {
  const { chartData, dashboardCode } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.chartListMap[dashboardCode] = {
      ...draftState.chartListMap[dashboardCode],
      ...chartData,
    };
  });
  return { ...nextState };
};
