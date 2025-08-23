import { produce } from 'immer';
import { chain, includes } from 'lodash';
import { getChartList } from '../function';

export default (state: any, action: any) => {
  const { filterChartList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.chartList = getChartList({
      chartList: filterChartList,
      chartListMap: draftState.chartListMap,
    });
    draftState.hasMore = false;
    draftState.chartListMap = chain(draftState.chartListMap)
      .keys()
      .reduce(
        (listMap, dashboardCode: string) => ({
          ...listMap,
          [dashboardCode]: {
            ...draftState.chartListMap[dashboardCode],
            visible: !!includes(filterChartList, dashboardCode),
          },
        }),
        {}
      )
      .value();
  });
  return { ...nextState };
};
