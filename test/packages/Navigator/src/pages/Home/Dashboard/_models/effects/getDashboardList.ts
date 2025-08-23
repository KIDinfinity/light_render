import { LS, LSKey } from '@/utils/cache';
import lodash, { isEmpty } from 'lodash';
import { getGlobalConfig } from '@/services/miscGlobalConfigControllerService';
import { tenant } from '@/components/Tenant';

export default function* (_: any, { call, put, select }: any) {
  let DashboardVersion = LS.getItem(LSKey.DashboardVersion);
  if (isEmpty(DashboardVersion)) {
    const response = yield call(getGlobalConfig, {
      codeType: 'dashboardV2',
      region: tenant.region(),
    });
    // DashboardVersion = 'default'
    DashboardVersion =
      lodash.get(response, 'resultData[0].defaultValue') === 'Y' ? 'common' : 'default';

    if (response?.success && response?.resultData) {
      LS.setItem(LSKey.DashboardVersion, DashboardVersion);
    }
  }

  if (DashboardVersion === 'common') {
    yield put({
      type: 'getCommonDashboardList',
    });
  }

  if (DashboardVersion === 'default') {
    yield put({
      type: 'getDefaultDashboardList',
    });
  }
}
