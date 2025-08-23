import { listDashboardsV2 } from '@/services/owbReportCenterMetadataConfigControllerService';
import { TypeEnum } from '@/enum/GolbalAuthority';
import { LS, LSKey } from '@/utils/cache';
import { isEmpty, filter, find, map, chain } from 'lodash';
import { getDashboardV2 } from '../function';
import { listDashboardsV2Response } from 'mocks/apis/dashboard';

const isMockDashboard = false;

const mockLeftBtnLength = 2;
const mockDashboard = {
  ...listDashboardsV2Response,
  resultData: listDashboardsV2Response?.resultData.map((item, index) => ({
    ...item,
    dashboardCode: `${item.dashboardCode}_${index}`,
    dashboardName: item.chartTypeTitle,
    chartData: JSON.stringify(item.chartData),
    dashboardSeriesConfigVO: {
      ...item.dashboardSeriesConfigVO,
      sequenceNoInSeries: (index % mockLeftBtnLength) + 1,
    },
  })),
};

export default function* (_: any, { call, put, select }: any) {
  let dashboardData = LS.getItem(LSKey.DashboardConmmon) || {};

  const commonAuthorityList = yield select(
    (state: any) => state.authController.commonAuthorityList
  );

  if (isEmpty(commonAuthorityList)) {
    dashboardData = {};
  }
  if (
    !isEmpty(commonAuthorityList) &&
    (isEmpty(dashboardData) || !dashboardData?.chartListAll?.length || isMockDashboard)
  ) {
    const response = !isMockDashboard ? yield call(listDashboardsV2) : mockDashboard;

    if (response?.success && response?.resultData) {
      const filterDashboardData = filter(response?.resultData, (item: any) => {
        const objectItem = find(
          commonAuthorityList,
          (commonItem: any) => item.dashboardCode === commonItem.authorityCode
        );
        if (objectItem && !isEmpty(objectItem)) {
          return (
            item.dashboardCode === objectItem.authorityCode &&
            objectItem.type === TypeEnum.Comm &&
            objectItem.result &&
            item.visible
          );
        }
        return false;
      });
      dashboardData = getDashboardV2(filterDashboardData);
      LS.setItem(LSKey.DashboardConmmon, dashboardData);
    }
  }
  if (!isEmpty(dashboardData)) {
    const queryChartDataCodeList = map(dashboardData?.chartListV2Map, (item) =>
      chain(item).first().first().toString().value()
    );
    yield put({
      type: 'saveDashboardList',
      payload: {
        ...dashboardData,
        dashboardVersion: 'common',
      },
    });

    // mock data with chartData no need to query
    if (!isMockDashboard) {
      if (!isEmpty(queryChartDataCodeList)) {
        const queryChartData = map(queryChartDataCodeList, (dashboardCode) => {
          if (!isEmpty(dashboardCode)) {
            return put.resolve({
              type: 'queryChartData',
              payload: {
                dashboardCode,
                backUpData: dashboardData.chartListMap[dashboardCode],
              },
            });
          }
        });
        yield queryChartData;
      }
      yield put.resolve({
        type: 'loadCharts',
      });
    }
  }
  yield put({
    type: 'saveFirstLoading',
    payload: {
      firstLoading: false,
    },
  });
}
