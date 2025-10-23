import { handleRegionSwitch } from '@/services/supportCenterControllerService';
import { LSKey } from '@/utils/cache';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

export default function* getRegionList({ payload }: any, { call, put }: any) {
  const { userId } = payload;
  const region = tenant.region();

  if (lodash.isNil(userId)) return;
  const response = yield call(handleRegionSwitch, payload, {
    headers: { ['X-Tenant']: region.toLowerCase(), ['X-Region']: region.toUpperCase() },
  });

  if (!response || response?.error) return;

  localStorage.setItem(LSKey.ENV_LIST, response?.responseData?.switchRegionList);

  yield put({
    type: 'saveUserEnvInfo',
    payload: { switchRegionList: response?.responseData?.switchRegionList },
  });
}
