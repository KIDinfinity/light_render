import { produce } from 'immer';
import lodash from 'lodash';
export default (state, action) => {
  const { isOpen, dashboardCode } = action?.payload || {};

  if (!state.chartListMap?.[dashboardCode]) return;
  const nextState = produce(state, (draftState: any) => {
    draftState.chartListMap[dashboardCode].openFilter = isOpen;
    if (isOpen) {
      draftState.chartListMap[dashboardCode].temporarySearchFilter =
        draftState.chartListMap[dashboardCode].searchDatas;
    }

    if (!isOpen && lodash.has(draftState, 'chartListMap[dashboardCode].temporarySearchFilter')) {
      draftState.chartListMap[dashboardCode].searchDatas =
        draftState.chartListMap[dashboardCode].temporarySearchFilter;
    }
  });
  return { ...nextState };
};
