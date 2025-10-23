import { commonSearch } from '@/services/dcDashboardControllerService';
import lodash from 'lodash';
import { NAMESPACE } from 'packages/Opus/Pages/Home/activity.config';
import { formateFilterChoiceData } from 'packages/Opus/Components/Filter';

export default function* (
  { payload, signal = null }: any,
  { select, call, put }: any
): Generator<any, any, any> {
  const { extraParams = {}, categoryCode } = payload || {};
  const organizationCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.organizationCode
  ) || '';

  const filterChoice = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.taskData?.filterChoice
  ) || '';

  const { businessCode } = yield select(({ user }: any) => user?.currentUser) || {};
  const response = yield call(
    commonSearch,
    {
      categoryCode,
      organizationCode,
      businessCode,
      currentPage: 1,
      pageSize: 20,
      sortName: '',
      sortOrder: '',
      sortOrders: [],
      ...extraParams,
      params: {
        ...extraParams.params,
        ...formateFilterChoiceData(filterChoice),
      },
    },
    { signal }
  );

  if (lodash.isPlainObject(response) && !!response?.success) {
    const list = response?.resultData?.rows || [];
    yield put.resolve({
      type: 'saveTaskData',
      payload: {
        taskData: {
          current: extraParams?.currentPage || 1,
          total: response?.resultData?.total,
          totalWealth: response.resultData.totalWealth,
          totalNonWealth: response.resultData.totalNonWealth,
          list: lodash.map(list, (item) => ({
            ...item,
            id: item.taskId,
          })),
        },
      },
    });
  }

  return response;
}
