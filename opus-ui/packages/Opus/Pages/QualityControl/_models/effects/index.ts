import { saveFavoriteTasks } from '@/services/bpmFavouriteTaskService';
import {
  findDropdownList,
  commonSearch,
  commonSearchExport,
} from '@/services/dcDashboardControllerService';
import {
  findOrganizationModule,
  findOrganizationByOwnerId,
} from '@/services/userCenterOrganizationControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { findUncompletedByUserId } from '@/services/userCenterUserInquiryControllerService';

import { tenant } from '@/components/Tenant';

import lodash from 'lodash';

import nameSpace from '../nameSpace';

export default {
  getTaskList: [
    function* getTaskList({ payload }: any, { put, select, call }: any): Generator<any, any, any> {
      yield put({ type: 'saveLoading', payload: true });
      const { extraParams = {}, categoryCode } = payload || {};

      const { businessCode } = yield select(({ user }: any) => user?.currentUser) || {};

      const filterChoice = yield select(
        ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace?.[categoryCode]?.filterChoice
      ) || '';
      const organizationCode = yield select(
        ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace?.organizationCode
      ) || '';

      const response = yield call(commonSearch, {
        businessCode,
        categoryCode,
        currentPage: 1,
        pageSize: 10,
        organizationCode,
        sortName: '',
        sortOrder: '',
        sortOrders: [],
        ...extraParams,
        params: {
          ...(extraParams?.params || {}),
          ...filterChoice,
        },
      });

      if (lodash.isPlainObject(response) && !!response?.success) {
        const list = response?.resultData?.rows || [];

        yield put({
          type: 'saveTaskData',
          payload: {
            current: extraParams?.currentPage || 1,
            total: response?.resultData?.total,
            list: list,
            type: categoryCode,
          },
        });
      }
      yield put({ type: 'saveLoading', payload: false });
    },
    { type: 'takeLatest' },
  ],
  *getFilterDatas({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
    const { fieldName, categoryCode } = payload || [];

    const filterDatas = yield select(
      ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace?.taskData?.filterDatas
    ) || [];
    const userId = yield select(({ user }: any) => user?.currentUser?.userId) || '';
    const businessCode = yield select(({ user }: any) => user?.currentUser?.businessCode) || '';

    const activityList = yield select(
      ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace?.activityList
    ) || [];

    if (!lodash.includes(lodash.keys(filterDatas), fieldName)) {
      const response = yield call(findDropdownList, {
        activityList,
        fieldName,
        userId,
        businessCode,
        categoryCode,
      });

      if (
        lodash.isPlainObject(response) &&
        !!response?.success &&
        lodash.isArray(response?.resultData)
      ) {
        // TODO:这里需要国际化
        yield put({
          type: 'saveFilterDatas',
          payload: {
            [fieldName]: response?.resultData,
            categoryCode,
          },
        });
      }

      return response;
    }
    return null;
  },
  *getOrganizationCode({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
    const { categoryCode } = payload || {};
    const { businessCode } = yield select(({ user }: any) => user?.currentUser) || {};

    const userId = yield select(({ user }: any) => user?.currentUser?.userId) || {};

    const organizationResponse = yield call(findOrganizationByOwnerId, { owner: userId });

    if (
      lodash.isPlainObject(organizationResponse) &&
      !!organizationResponse?.success &&
      lodash.isArray(organizationResponse?.resultData)
    ) {
      const organizationList = organizationResponse?.resultData || [];
      const response = yield call(
        findOrganizationModule,
        objectToFormData({
          businessCode,
          regionCode: tenant.region(),
        })
      );

      if (
        lodash.isPlainObject(response) &&
        !!response?.success &&
        lodash.isArray(response?.resultData)
      ) {
        // TODO:这里需要国际化
        yield put({
          type: 'saveOrganizationCode',
          payload: {
            organizationCode: lodash
              .chain(response?.resultData || [])
              .find(({ moduleId }: any) => moduleId === 'QC')
              .get('organizationCode')
              .value(),
            organizationList,
          },
        });
        yield put({
          type: 'getTaskList',
          payload: {
            categoryCode,
          },
        });
      }
    }

    return organizationResponse;
  },
  *getFavoriteTasks({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
    const { taskIds = [], categoryCode } = payload || [];

    const userId = yield select(({ user }: any) => user?.currentUser?.userId) || '';

    const response = yield call(
      saveFavoriteTasks,
      lodash
        .chain(taskIds || [])
        .map((taskId: string) => ({
          userId,
          taskId,
        }))
        .value() || []
    );

    if (!!response?.success) {
      yield put({
        type: 'getTaskList',
        payload: {
          categoryCode,
        },
      });
    }
    return response;
  },
  *getExport({ payload }: any, { select, call }: any): Generator<any, any, any> {
    const { extraParams, categoryCode } = payload || {};
    const params = yield select(({ [nameSpace]: model }: any) => model.params);

    const businessCode = yield select(({ user }: any) => user?.currentUser?.businessCode) || '';
    const organizationCode = yield select(
      ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace?.organizationCode
    ) || '';
    const filterChoice = yield select(
      ({ [nameSpace]: model }: any) => model?.[categoryCode]?.filterChoice
    ) || [];

    const response = yield call(commonSearchExport, {
      categoryCode,
      businessCode,
      organizationCode,
      currentPage: 1,
      pageSize: 10,
      sortName: '',
      sortOrder: '',
      sortOrders: [],
      ...extraParams,
      params: {
        ...(extraParams?.params || {}),
        ...filterChoice,
      },
    });

    if (lodash.isPlainObject(response) && !!response?.success) {
    }
  },
  *setIncompleteCases({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
    const { list, currentPage } = payload || {};

    const params = {
      ...payload,
      todoCaseCount: 0,
      pendingCaseCount: 0,
      current: currentPage ? currentPage : 1,
    };

    if (list) {
      params.list = list;
      params.total = list.length;
    }

    yield put({
      type: 'saveIncompletedCases',
      payload: {
        incompleteCases: params,
      },
    });

    return true;
  },
  *getIncompleteCases({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
    const { extraParams = {} } = payload || {};

    const filterChoice = yield select(
      ({ [nameSpace]: modelnamepsace }: any) => modelnamepsace?.taskData?.filterChoice
    ) || '';
    const response = yield call(findUncompletedByUserId, {
      ...payload,
      params: {
        ...(payload.params || {}),
        ...filterChoice,
      },
    });

    if (lodash.isPlainObject(response) && !!response?.success) {
      const { rows = [], total = 0, params = {} } = response.resultData || {};
      const { todoCaseCount = 0, pendingCaseCount = 0 } = params;

      yield put({
        type: 'saveIncompletedCases',
        payload: {
          incompleteCases: {
            current: extraParams?.currentPage || 1,
            total,
            todoCaseCount,
            pendingCaseCount,
            list: lodash.map(rows, (item) => ({
              ...item,
              id: item.taskId,
            })),
          },
        },
      });
    }

    return response;
  },
};
