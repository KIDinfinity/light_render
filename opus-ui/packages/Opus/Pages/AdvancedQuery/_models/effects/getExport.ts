import lodash from 'lodash';

import { commonSearchExport } from '@/services/dcDashboardControllerService';
import { formateFilterChoiceData } from 'packages/Opus/Components/Filter';

import nameSpace from '../nameSpace';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const { extraParams } = payload || {};
  const params = yield select(({ [nameSpace]: model }: any) => model.params);

  const businessCode = yield select(({ user }: any) => user?.currentUser?.businessCode) || '';

  const filterChoice = yield select(
    ({ opusAdvancedSearch }: any) => opusAdvancedSearch?.taskData?.filterChoice
  ) || [];

  const response = yield call(commonSearchExport, {
    categoryCode: '27',
    businessCode,
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

  if (lodash.isPlainObject(response) && !!response?.success) {
  }
}
