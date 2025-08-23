import lodash from 'lodash';
import dcTaskControllerService, {
  beAssignTaskList,
  batchAssignDropDown,
} from '@/services/dcTaskControllerService';
import ucAdvancedQueryControllerService from '@/services/ucAdvancedQueryControllerService';
import { batchAssignTask } from '@/services/bpmProcessTaskService';
import { tenant } from '@/components/Tenant';
import { resRevert } from '@/utils/transform';
import { LS, LSKey } from '@/utils/cache';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import bpmProcessActivityService from '@/services/bpmProcessActivityService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const initData = {
  params: {
    params: { defaultSortName: 'submissionDate', regionCode: tenant.region() },
    currentPage: 1,
    pageSize: 10,
    sortName: 'submissionDate',
    sortOrder: 'desc',
    sortOrders: [],
    defaultSortName: 'submissionDate',
  },
  assignTasks: { list: [], pagination: {} },
  filterParams: {},
};

export default {
  namespace: 'advancedQueryBatchAssign',
  state: {
    useBatchAssign: false,
    assignList: [],
    ...initData,
  },
  effects: {
    *getAssignTask({ payload }: any, { select, put, call }: any) {
      const stateParams = yield select((state) => state.advancedQueryBatchAssign.params);
      const filterParams = yield select((state) => state.advancedQueryBatchAssign.filterParams);
      const params = payload?.params || {};
      const newParams = {
        ...stateParams,
        ...params,
        params: { ...stateParams.params, ...filterParams, ...params?.params },
      };
      const response = yield call(beAssignTaskList, newParams);
      const resRevertResponse = resRevert(response);
      yield put({
        type: 'saveList',
        payload: { assignTasks: resRevertResponse },
      });
    },
    *getAssignList(_: any, { call, put }: any) {
      const response = yield call(ucAdvancedQueryControllerService.contactsQuery, {});
      yield put({
        type: 'saveAssignList',
        payload: {
          assignList: response.resultData || [],
        },
      });
    },
    *assign({ payload }: any, { select, call }: any) {
      const assignee = yield select(
        (state) => state.advancedQueryBatchAssign.params?.params?.assignee
      );
      const currentUser = LS.getItem(LSKey.CURRENTUSER)?.userId;
      const { selectedRow } = payload;
      const response = yield call(
        batchAssignTask,
        selectedRow.map((item) => {
          const { taskId, caseCategory } = item;
          return { taskId, assignee, caseCategory, assigner: currentUser };
        })
      );
      if (response.success) {
        return true;
      }
      return false;
    },
    *getBusinessTypeList({ payload }: any, { call, put }: any) {
      const { categoryCode, language, regionCode, typeCode, isCase } = payload;
      const response = yield call(
        miscDictionaryControllerService.queryByRegionCodeAndCategory,
        objectToFormData({
          categoryCode,
          language,
          regionCode,
          typeCode,
        })
      );
      if (response?.success) {
        yield put({
          type: 'saveBusinessTypeList',
          payload: {
            businessTypeList: response.resultData,
            isCase,
          },
        });
      }
    },
    *findActivitiesByCaseCategory({ payload }: any, { call, put }: any) {
      const { caseCategory, isCase } = payload;
      const response = yield call(
        bpmProcessActivityService.findActivitiesByCaseCategory,
        objectToFormData({ caseCategory })
      );
      if (response?.success) {
        yield put({
          type: 'saveCurrentActivityList',
          payload: {
            currentStatusList: response.resultData,
            isCase,
          },
        });
      }
    },
    *getBatchAssignDropDown({ payload }: any, { call, put, select }: any) {
      const stateParams = yield select((state) => state.advancedQueryBatchAssign.params);
      const filterParams = yield select((state) => state.advancedQueryBatchAssign.filterParams);
      const params = payload?.params || {};
      const newParams = {
        ...stateParams,
        ...params,
        params: { ...stateParams.params, ...filterParams, ...params?.params },
      };
      const response = yield call(batchAssignDropDown, newParams);
      if (response?.success) {
        yield put({
          type: 'saveBatchAssignDropDownList',
          payload: {
            batchAssignDropDownAllList: response.resultData,
          },
        });
      }
    },
    *getPermission({ payload }: any, { call }: any) {
      const response = yield call(dcTaskControllerService.validationBatchAssignTask, payload);
      return response;
    },
  },

  reducers: {
    saveBatchAssignDropDownList(state: any, { payload }: any) {
      const { batchAssignDropDownAllList } = payload;
      return { ...state, batchAssignDropDownAllList };
    },
    saveBusinessTypeList(state: any, { payload }: any) {
      const { businessTypeList } = payload;
      return {
        ...state,
        businessTypeList,
      };
    },
    saveCurrentActivityList(state: any, { payload }: any) {
      const { currentStatusList } = payload;
      const currentActivityList = lodash.map(currentStatusList, (item) => {
        return {
          autoActivity: item?.autoActivity,
          dictCode: item?.processActivityKey,
          dictName: formatMessageApi({ activity: item?.processActivityKey }),
        };
      });
      return {
        ...state,
        currentActivityList: currentActivityList,
      };
    },

    saveUseBatchAssign(state: any, { payload }: any) {
      const { useBatchAssign } = payload;
      return {
        ...state,
        useBatchAssign,
      };
    },
    saveList(state: any, { payload }: any) {
      const { assignTasks } = payload;
      return {
        ...state,
        assignTasks,
      };
    },
    saveAssignList(state: any, { payload }: any) {
      const { assignList } = payload;
      return {
        ...state,
        assignList,
      };
    },
    saveFilterParams(state: any, { payload }: any) {
      const { changeValue } = payload;

      return {
        ...state,
        filterParams: lodash.pickBy({ ...state.filterParams, ...changeValue }),
      };
    },
    saveSort(state: any, { payload }: any) {
      const { sortName } = payload;
      state.params.currentPage = 1;
      let sortObj = {};
      if (state.params.sortName === sortName) {
        switch (state.params.sortOrder) {
          case undefined: {
            sortObj.sortOrder = 'asc';
            break;
          }
          case '': {
            sortObj.sortOrder = 'asc';
            break;
          }
          case 'asc': {
            sortObj.sortOrder = 'desc';
            break;
          }
          case 'desc': {
            sortObj.sortOrder = '';
            break;
          }
        }
      } else {
        sortObj = {
          sortName,
          sortOrder: 'asc',
        };
      }
      return {
        ...state,
        params: {
          ...state.params,
          ...sortObj,
        },
      };
    },
    updateParams(state: any, { payload }: any) {
      const { params } = payload;
      return {
        ...state,
        params: {
          ...state.params,
          ...params,
          params: { ...state.params.params, ...params?.params },
        },
      };
    },
    clear(state: any) {
      const caseCategory = state.filterParams.caseCategory;
      return {
        ...state,
        ...initData,
        filterParams: {
          caseCategory,
        },
      };
    },
  },
};
