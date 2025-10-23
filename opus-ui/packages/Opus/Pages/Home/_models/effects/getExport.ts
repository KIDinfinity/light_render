import lodash from 'lodash';

import { commonSearchExport } from '@/services/dcDashboardControllerService';

import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';
export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { extraParams = {}, categoryCode } = payload || {};
  const organizationCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.organizationCode
  ) || '';

  const { businessCode } = yield select(({ user }: any) => user?.currentUser) || {};

  const response = yield call(commonSearchExport, {
    categoryCode,
    organizationCode,
    businessCode,
    currentPage: 1,
    pageSize: 10,
    sortName: '',
    sortOrder: '',
    sortOrders: [],
    ...extraParams,
  });

  if (lodash.isPlainObject(response) && !!response?.success) {
  }
}
