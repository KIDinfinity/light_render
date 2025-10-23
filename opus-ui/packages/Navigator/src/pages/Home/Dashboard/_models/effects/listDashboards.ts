import { listDashboards } from '@/services/owbReportCenterMetadataConfigControllerService';
import { TypeEnum } from '@/enum/GolbalAuthority';
import { LS, LSKey } from '@/utils/cache';
import { isEmpty, filter, find } from 'lodash';
import { getDashboard } from '../function';

export default function* (_: any, { call, put, select }: any) {
  let dashboardData = LS.getItem(LSKey.Dashboard) || {};

  if (isEmpty(dashboardData) || !dashboardData?.chartListAll?.length) {
    const response = yield call(listDashboards);
    if (response?.success && response?.resultData) {
      const commonAuthorityList = yield select(
        (state: any) => state.authController.commonAuthorityList
      );
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
        return item;
      });
      dashboardData = getDashboard(filterDashboardData);
      LS.setItem(LSKey.Dashboard, dashboardData);
    }
  }
  if (!isEmpty(dashboardData)) {
    yield put({
      type: 'saveDashboardList',
      payload: {
        ...dashboardData,
      },
    });
    yield put.resolve({
      type: 'loadCharts',
    });
  }
}
