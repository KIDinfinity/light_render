import lodash from 'lodash';
import type { IEffects } from '../interfaces/index';

/**
 * 初始化information 数据
 * @param processInstanceId
 * @param dataKey
 */
export default function* loadInformationInitData({ payload }: any, { put, select }: IEffects) {
  const { taskId, dataKey, processInstanceId, taskDetail } = payload;
  const userId = yield select((state: any) => state.user.currentUser.userId);
  const tabs = yield select((state: any) => state.navigatorInformationController?.tabs, []);
  const cacheChatLink = yield select(
    (state: any) => state.navigatorInformationController?.cacheChatLink,
    {}
  );
  const noPermissionCases = yield select((state) => state.authController.noPermissionCases);
  if (noPermissionCases[processInstanceId]) return;

  const loadDict = put.resolve({
    type: 'loadCategoryDict',
  });
  const loadActives = yield put.resolve({
    type: 'loadActiveNameList',
    payload: {
      caseNo: processInstanceId,
      userId,
      taskId,
    },
  });
  if (loadActives) {
    return;
  }
  let loadDefaultCategoryParams = {};
  // debugger;
  switch (dataKey) {
    case 'caseNo':
      loadDefaultCategoryParams = {
        dataKey: 'caseNo',
        dataValue: processInstanceId,
      };
      break;
    case 'taskId':
    default:
      loadDefaultCategoryParams = {
        dataKey: 'taskId',
        dataValue: taskId,
      };
      break;
  }
  const getClassificationData = put.resolve({
    type: 'getClassificationData',
    payload: {
      processInstanceId,
    },
  });
  const loadActivityCategory = put.resolve({
    type: 'loadDefaultActiveCategory',
    payload: loadDefaultCategoryParams,
  });

  let getTatskStatus = null;
  if (taskId) {
    getTatskStatus = put({
      type: 'findStatusByTaskId',
      payload: {
        taskDetail
      }
    });
  }
  if (!taskId && dataKey === 'caseNo') {
    getTatskStatus = put.resolve({
      type: 'findLatesTaskByCaseNo',
    });
  }

  const loadHistoryData = put.resolve({
    type: 'loadFirstPage',
    payload: {
      tabs,
    },
  });
  yield put({
    type: 'clearAuditLogList',
  });

  yield [loadDict, loadActives, getClassificationData, loadActivityCategory, getTatskStatus];
  yield [loadHistoryData];
  if (!lodash.isEmpty(cacheChatLink)) {
    yield put({
      type: 'chatLink',
      payload: {
        archiveList: cacheChatLink,
      },
    });

    yield put({
      type: 'setCacheChatLink',
      payload: {
        archiveList: {},
      },
    });
  }
}
