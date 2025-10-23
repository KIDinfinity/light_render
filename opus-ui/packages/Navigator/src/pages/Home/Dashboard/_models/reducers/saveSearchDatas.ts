import { produce } from 'immer';

export default (state: any, action: any) => {
  const { changedFields, dashboardCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.chartListMap[dashboardCode].searchDatas = {
      ...draftState.chartListMap[dashboardCode].searchDatas,
      ...changedFields,
    };
  });
  return { ...nextState };
};
