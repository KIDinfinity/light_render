import lodash from 'lodash';

import { commonSearch } from '@/services/dcDashboardControllerService';
import { formateFilterChoiceData } from 'packages/Opus/Components/Filter';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { extraParams, categoryCode } = payload || {};

  const businessCode = yield select(({ user }: any) => user?.currentUser?.businessCode) || '';

  const filterChoice = yield select(
    ({ opusAdvancedSearch }: any) => opusAdvancedSearch?.taskData?.filterChoice
  ) || [];

  const response = yield call(commonSearch, {
    businessCode,
    categoryCode,
    currentPage: 1,
    pageSize: 10,
    sortName: '',
    sortOrder: '',
    sortOrders: [],
    ...extraParams,
    params: {
      ...(extraParams?.params || {}),
      ...formateFilterChoiceData(filterChoice),
    },
  });

  yield put({
    type: 'saveSearched',
    payload: {
      searched: true,
    },
  });

  if (lodash.isPlainObject(response) && !!response?.success) {
    yield put({
      type: 'saveTaskData',
      payload: {
        current: extraParams?.currentPage || 1,
        total: response?.resultData?.total,
        list: response?.resultData?.rows,
      },
    });
  }
}
