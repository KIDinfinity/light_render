import lodash from 'lodash';

import { quickSearch } from '@/services/dcDashboardControllerService';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { searchContent } = payload || {};

  const businessCode = yield select(({ user }: any) => user?.currentUser?.businessCode) || '';

  const response = yield call(quickSearch, {
    businessCode,
    searchContent,
  });

  if (lodash.isPlainObject(response) && !!response?.success) {
    // yield put({
    //   type: 'saveTaskData',
    //   payload: {
    //     current: extraParams?.currentPage || 1,
    //     total: response?.resultData?.total,
    //     list: lodash.map(response?.resultData?.rows || [], (item) => ({
    //       ...item,
    //       id: uuidv4(),
    //     })),
    //   },
    // });
  }
}
