import delay from '@/utils/delay';
import { filter, slice, includes, concat, isEmpty } from 'lodash';
import { getChartList } from '../function';

export default [
  function* (_: any, { put, select }: any) {
    yield delay(500);
    const { pageSize, chartListAll, chartListMap, chartList } = yield select(
      (state: any) => state.dashboardController
    );
    if (!chartListAll) return;

    // 取出可见的，并且不是已经显示的（PS：点击眼睛可以把后面的未分页的加载出来）
    const chartListArrays = filter(
      chartListAll,
      (dashboardCode: string) => !!chartListMap?.[dashboardCode]?.visible
    );

    const notExitArray = filter(
      chartListArrays,
      (dashboardCode: string) => !includes(chartList, dashboardCode)
    );

    if (isEmpty(notExitArray)) {
      return;
    }

    const newChartList = getChartList({
      chartList: concat(chartList, slice(notExitArray, 0, pageSize)),
      chartListMap,
    });

    yield put({
      type: 'saveChartList',
      payload: {
        chartList: newChartList,
        hasMore: newChartList?.length < chartListArrays?.length,
      },
    });
  },
  { type: 'takeLatest' },
];
