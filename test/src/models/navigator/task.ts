// @ts-ignore
import { saga } from 'dva';
import { serialize as objectToFormData } from 'object-to-formdata';
import { notification } from 'antd';
import lodash, { isEmpty } from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import bpmProcessTaskService from '@/services/bpmProcessTaskService';
import dcHomePageCaseDataCallService from '@/services/dcHomePageCaseDataCallService';
import dcTaskInquiryControllerService from '@/services/dcTaskInquiryControllerService';
import bpmFavouriteTaskService from '@/services/bpmFavouriteTaskService';
import { resRevert } from '@/utils/transform';
import request from '@/utils/request';
import { formUtils } from 'basic/components/Form';
import { querySnapshotVersion } from '@/services/navigatorTaskInfoControllerService';

const { delay } = saga;

// 动态调用
function post({ url, payload }: any) {
  return request(url, {
    method: 'POST',
    body: {
      ...payload,
    },
  });
}

function getRequest(payload: any, userId: any) {
  const taskStatus = lodash.get(payload, 'params.taskStatus', '');
  const object = payload;
  let requestFunc = dcHomePageCaseDataCallService.priorities;

  switch (taskStatus) {
    case 'completed': {
      requestFunc = dcHomePageCaseDataCallService.completes;
      break;
    }
    case 'favorite': {
      object.params.userId = userId;
      requestFunc = dcHomePageCaseDataCallService.favorites;
      break;
    }
    case 'unassigned': {
      object.params.assignee = 'unassigned';
      object.params.taskStatus = 'todo';
      requestFunc = dcHomePageCaseDataCallService.unassign;
      break;
    }
    default: {
      break;
    }
  }
  switch (tenant.region()) {
    case Region.VN: {
      object.sortName = 'submissionDate';
      object.sortOrder = 'asc';
    }
    default: {
      break;
    }
  }
  return { requestFunc, object };
}
export default {
  namespace: 'task',

  state: {
    taskList: [],
    filterList: {},
    taskDetail: {},
    validate: false,
    favoriteStatus: 0,
    caskIndex: 0,
    swiperList: [],
    currentVersion: undefined,
    savingVersionNo: undefined,
    dataType: 'mainPage',
  },

  effects: {
    *checkVersion({ payload }: any, { select }: any): Generator<any, any, any> {
      const { taskId } = payload;
      const { currentVersion, savingVersionNo, dataType } = yield select((state) => state.task);

      // const multipleOverallSideBarInfoController = new AbortController();

      // if (multipleOverallSideBarInfoController) {
      //   multipleOverallSideBarInfoController?.abort();
      // }
      const response: any = yield querySnapshotVersion(
        {
          taskId,
          dataType,
        }
        // { signal: multipleOverallSideBarInfoController.signal }
      );

      let success: any = true;
      if (!response?.resultData?.versionNo || !response?.success) {
        return {
          success,
          ...response?.resultData,
        };
      }
      success = response?.resultData?.versionNo <= (savingVersionNo || currentVersion);

      return {
        success,
        ...response?.resultData,
      };
    },
    *updateVersion({ payload }: any, { put, select }: any): Generator<any, any, any> {
      const { taskId } = payload;
      const { dataType } = yield select((state) => state.task);
      const response: any = yield querySnapshotVersion({
        taskId,
        dataType,
      });
      yield put({
        type: 'saveVersion',
        payload: {
          currentVersion: response?.resultData?.versionNo,
        },
      });
    },
    *dynamiCall({ payload, url }: any, { call, put }: any): Generator<any, any, any> {
      const response = yield call(post, { url, payload });

      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            validate: response?.success,
          },
        });
      }

      return response;
    },
    // 根据节点获取任务数量
    *taskCountByActivity(
      { payload, signal = null }: any,
      { call, put }: any
    ): Generator<any, any, any> {
      const response = yield call(dcHomePageCaseDataCallService.countTaskByActivity, payload, {
        signal,
      });
      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            taskCountByActivity: resRevert(response),
          },
        });
      }
    },
    // 任务常规分页
    *list({ payload, signal = null }: any, { call, put, select }: any): Generator<any, any, any> {
      const userId = yield select((state: any) => state.user.currentUser.userId);
      const { requestFunc, object } = getRequest(payload, userId);
      const response = yield call(requestFunc, object, { signal });
      if (response?.success) {
        const revertResponse = resRevert(response);
        yield put({
          type: 'save',
          payload: {
            taskList: revertResponse,
          },
        });
        if (lodash.isArray(revertResponse.list) && !lodash.isEmpty(revertResponse.list)) {
          yield put({
            type: 'workspaceSwitchOn/handleTaskChange',
            payload: {
              record: revertResponse.list[0],
            },
          });
          yield put({
            type: 'advancedQueryController/saveTaskId',
            payload: {
              taskId: revertResponse.list[0]?.taskId,
            },
          });
        }

        return revertResponse;
      }
      return true;
    },
    *addList(
      { payload, signal = null }: any,
      { call, put, select }: any
    ): Generator<any, any, any> {
      const userId = yield select((state: any) => state.user.currentUser.userId);
      const taskList = yield select((state: any) => state.task.taskList);
      const { page = 1, pageSize = 10, total = 0, totalPage } = taskList.pagination || {};
      const { requestFunc, object } = getRequest(payload, userId);
      const response = yield call(requestFunc, object, { signal });
      if (response?.success) {
        const revertResponse = resRevert(response);
        yield put({
          type: 'save',
          payload: {
            taskList: {
              ...taskList,
              list: lodash.uniq(taskList?.list.concat(revertResponse?.list)),
              pagination: {
                page: page + 1,
                pageSize,
                total,
                totalPage,
              },
            },
          },
        });
      }
    },
    *exportExcel({ payload }: any, { call, put, select }: any): Generator<any, any, any> {
      yield delay(0);
      const configuration = yield select((state: any) => ({
        configuration: state.configController.configuration,
        sortFromTable: state.advancedQueryController.sortFromTable,
      }));

      if (isEmpty(configuration.configuration)) {
        configuration.configuration = yield put.resolve({
          type: 'configController/getConfiguration',
        });
      }

      const newParams = formUtils.transfersParams(payload, configuration, 'task');
      const response = yield call(dcTaskInquiryControllerService.advSearchExport, newParams);
      return response;
    },
    filterList: [
      function* filterList({ payload }: any, { call, put, select }: any): Generator<any, any, any> {
        yield delay(0);

        const configuration = yield select((state: any) => ({
          configuration: state.configController.configuration,
          sortFromTable: state.advancedQueryController.sortFromTable,
        }));

        if (isEmpty(configuration.configuration)) {
          configuration.configuration = yield put.resolve({
            type: 'configController/getConfiguration',
          });
        }

        const newParams = formUtils.transfersParams(payload, configuration, 'task');
        const response = yield call(dcTaskInquiryControllerService.advSearch, newParams);

        if (response?.success) {
          // TODO:row不应该返回null的，应该后端处理
          if (response.resultData?.rows !== null) {
            const list = lodash.get(response, 'resultData.rows', []);
            yield put({
              type: 'save',
              payload: {
                filterList: resRevert(response),
              },
            });
            if (lodash.isArray(list) && !lodash.isEmpty(list)) {
              yield put({
                type: 'workspaceSwitchOn/handleTaskChange',
                payload: {
                  record: list[0],
                },
              });
            }
            yield put({
              type: 'advancedQueryController/saveTaskId',
              payload: {
                taskId: list[0]?.taskId,
              },
            });
          } else {
            yield put({
              type: 'save',
              payload: {
                filterList: [],
              },
            });
          }
          return response?.resultData;
        }
      },
      { type: 'takeLatest' },
    ],
    tableList: [
      function* tableList(
        { payload, signal = null }: any,
        { call, put, select }: any
      ): Generator<any, any, any> {
        const userId = yield select((state: any) => state.user.currentUser.userId);
        const { requestFunc, object } = getRequest(payload, userId);
        const response = yield call(requestFunc, object, { signal });
        if (response?.success) {
          yield put({
            type: 'advancedQueryController/saveStateOfSearchReducer',
            payload: {
              selectable: {
                prev: {
                  id: '',
                  index: -1,
                },
                current: {
                  id: '',
                  index: 0,
                },
                next: {
                  id: '',
                  index: 1,
                },
              },
            },
          });
          const revertResponse = resRevert(response);
          yield put({
            type: 'save',
            payload: {
              tableList: revertResponse,
            },
          });
          if (lodash.isArray(revertResponse.list) && !lodash.isEmpty(revertResponse.list)) {
            yield put({
              type: 'workspaceSwitchOn/handleTaskChange',
              payload: {
                record: revertResponse.list[0],
              },
            });
          }
        }
      },
      { type: 'takeLatest' },
    ],
    // 指派任务
    *assign({ payload }: any, { call }: any): Generator<any, any, any> {
      const response = yield call(bpmProcessTaskService.assignTask, payload);

      if (response?.success === true) {
        notification.success({ message: 'Assign Success' });
      } else {
        notification.error({
          message: response?.promptMessages?.[0]?.code || 'Assign Failed',
        });
      }

      return response;
    },

    *favoriteCollect({ payload }: any, { call }: any): Generator<any, any, any> {
      const { taskId, userId, favorite } = payload;
      const param = { taskId, userId };
      const response = yield call(
        bpmFavouriteTaskService.createFavoriteTask,
        objectToFormData(param)
      );
      if (response?.success) {
        if (favorite === 1) {
          notification.success({ message: 'Task collection success' });
        } else {
          notification.success({ message: 'Task collection Canceled' });
        }
        return true;
      }
      notification.error({ message: 'Task collection failed, please try again later!' });
      return false;
    },

    *favoriteInit({ payload }: any, { call }: any): Generator<any, any, any> {
      const response = yield call(
        bpmFavouriteTaskService.getFavoriteTask,
        objectToFormData(payload)
      );
      if (response?.success) {
        return response.resultData;
      }
      return response;
    },
  },

  reducers: {
    top(state: any, action: any) {
      return {
        ...state,
        topList: action.payload,
      };
    },
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveCaskIndex(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
    updataTask(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
    saveSwiperList(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 因为保存version的时候存在大量异步，目前判断一些自动化的问题就是异步导致的：一些异步可能会导致较早的版本号反过来覆盖了较晚的版本号，导致了后续尝试save时的弹框（未复现，所以无法确切证实）
    // 异步导致的问题无法完全避免，但我们可以在reducer内做判断，避免较早的版本号覆盖了较晚的
    // 但这会导致一个问题，切换case的时候，可能会因为新case的版本号更早，导致新case的版本号覆盖不进去。不过经过思考，这不会导致任何实际问题（弹框不会因此而多弹，也不会少弹）。具体过程就不放在这了
    saveVersion(state: any, action: any) {
      const currentVersion = action.payload?.currentVersion;
      if (!currentVersion || currentVersion < state.currentVersion) {
        return {
          ...state,
          ...action.payload,
          currentVersion: state.currentVersion,
        };
      }
      return {
        ...state,
        ...action.payload,
      };
    },
    saveSavingVersion(state: any, action: any) {
      const currentVersion = action.payload?.currentVersion;
      if (!currentVersion || currentVersion < state.currentVersion) {
        return {
          ...state,
          ...action.payload,
          currentVersion: state.currentVersion,
        };
      }
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
