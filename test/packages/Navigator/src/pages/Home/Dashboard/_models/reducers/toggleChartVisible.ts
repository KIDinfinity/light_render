import { produce } from 'immer';
import { getChartList } from '../function';

// 设置显示，并且需要排序
export default (state: any, action: any) => {
  const { dashboardCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const isExitChartList = draftState.chartList?.includes(dashboardCode);
    draftState.chartListMap[dashboardCode].visible = !draftState.chartListMap[dashboardCode]
      .visible;
    if (isExitChartList) {
      draftState.chartList = getChartList({
        chartList: draftState.chartList?.filter((key: string) => key !== dashboardCode),
        chartListMap: draftState.chartListMap,
      });
    }
  });
  return { ...nextState };
};
