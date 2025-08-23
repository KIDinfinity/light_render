import { LS, LSKey } from '@/utils/cache';
import lodash, { isEmpty } from 'lodash';
import { getGlobalConfig } from '@/services/miscGlobalConfigControllerService';
import { tenant } from '@/components/Tenant';
import { TableVersion } from 'navigator/enum/HomeTableVersion';

/**
 * 获取主页表格模式的版本
 * @param _
 * @param param1
 * @returns
 */
export default function* (_: any, { call, put, select }: any) {
  let homeTableVersion = LS.getItem(LSKey.homeTableVersion);
  if (isEmpty(homeTableVersion)) {
    const response = yield call(getGlobalConfig, {
      codeType: 'homeTableV2',
      region: tenant.region(),
    });
    homeTableVersion =
      lodash.get(response, 'resultData[0].defaultValue') === 'N'
        ? TableVersion.DEFAULT
        : TableVersion.V2;

    if (response?.success && response?.resultData) {
      LS.setItem(LSKey.homeTableVersion, homeTableVersion);
    }
  }

  yield put({ type: 'saveTableVersion', payload: { homeTableVersion } });

  if (homeTableVersion !== TableVersion.V2) {
    return;
  }

  const searchQuery = select((state: any) => state.advancedQueryController.stateOfSearch);
  yield put({ type: 'saveDashboardVisible', payload: { dashboardHidden: true } });
  yield put({
    type: 'advancedQueryController/saveStateOfSearch',
    payload: {
      stateOfSearch: { ...searchQuery, pagination: { ...searchQuery?.pagination, pageSize: 20 } },
    },
  });
}
